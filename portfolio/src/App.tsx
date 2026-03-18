import { useEffect, useRef, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { HandLandmarkerManager } from './lib/HandLandmarker';
// @ts-ignore
import type { HandLandmarker, HandLandmarkerResult } from '@mediapipe/tasks-vision';
import { LiquidChrome } from './components/LiquidChrome';
import Navbar from './components/Navbar';
import { Hero } from './components/Hero';
import { Sections, PROJECTS } from './components/Sections';
import DomeGallery, { type DomeGalleryHandle } from './components/DomeGallery';

const HAND_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4], // thumb
  [0, 5], [5, 6], [6, 7], [7, 8], // index finger
  [5, 9], [9, 10], [10, 11], [11, 12], // middle finger
  [9, 13], [13, 14], [14, 15], [15, 16], // ring finger
  [13, 17], [17, 18], [18, 19], [19, 20], // pinky
  [0, 17] // palm base
];

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const landmarkerRef = useRef<HandLandmarker | null>(null);
  const requestRef = useRef<number | null>(null);
  
  const navigate = useNavigate();
  const locationRef = useRef(location.pathname);
  useEffect(() => {
    locationRef.current = location.pathname;
  }, [location.pathname]);

  const frameCountRef = useRef(0);
  const pinchStartDistRef = useRef<number | null>(null);
  const singlePinchStartXRef = useRef<number | null>(null);
  const galleryRef = useRef<DomeGalleryHandle>(null);
  const lastResultsRef = useRef<HandLandmarkerResult | null>(null);
  
  // Velocity tracking for hand gestures
  const lastHandXRef = useRef<number | null>(null);
  const lastHandTimeRef = useRef<number>(0);
  const handVelocityXRef = useRef<number>(0);

  const activateInteraction = async () => {
    if (isCameraActive || !isTrackingEnabled) return;
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 }, 
          height: { ideal: 720 },
          facingMode: "user"
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error('Interaction activation failed:', err);
    }
  };

  const deactivateInteraction = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  // Handle tracking toggle
  useEffect(() => {
    if (isTrackingEnabled) {
      activateInteraction();
    } else {
      deactivateInteraction();
    }
  }, [isTrackingEnabled]);

  const drawHandSkeleton = (ctx: CanvasRenderingContext2D, results: HandLandmarkerResult) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    if (!results || !results.landmarks) return;

    ctx.save();
    // Mirror the drawing to match the scale-x-[-1] mirroring
    ctx.scale(-1, 1);
    ctx.translate(-ctx.canvas.width, 0);

    for (const landmarks of results.landmarks) {
      // Draw connections
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (const [startIdx, endIdx] of HAND_CONNECTIONS) {
        const start = landmarks[startIdx];
        const end = landmarks[endIdx];
        ctx.moveTo(start.x * ctx.canvas.width, start.y * ctx.canvas.height);
        ctx.lineTo(end.x * ctx.canvas.width, end.y * ctx.canvas.height);
      }
      ctx.stroke();

      // Draw landmarks
      for (let i = 0; i < landmarks.length; i++) {
        const landmark = landmarks[i];
        
        ctx.fillStyle = 'white';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
        
        ctx.beginPath();
        ctx.arc(
          landmark.x * ctx.canvas.width, 
          landmark.y * ctx.canvas.height, 
          3, 
          0, 
          Math.PI * 2
        );
        ctx.fill();
      }
    }
    ctx.restore();
  };

  const smoothedLandmarksRef = useRef<any[][]>([]);
  const lastPinchYRef = useRef<number | null>(null);

  useEffect(() => {
    HandLandmarkerManager.getInstance()
      .then((instance) => {
        landmarkerRef.current = instance;
      })
      .catch(console.error);

    const updateCanvasSize = () => {
      if (overlayCanvasRef.current) {
        overlayCanvasRef.current.width = window.innerWidth;
        overlayCanvasRef.current.height = window.innerHeight;
      }
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const renderLoop = () => {
      const video = videoRef.current;
      const overlayCanvas = overlayCanvasRef.current;

      if (isCameraActive && video && video.readyState >= 2 && landmarkerRef.current) {
        try {
          const results: HandLandmarkerResult = (frameCountRef.current++ % 2 === 0)
            ? landmarkerRef.current.detectForVideo(video, performance.now())
            : lastResultsRef.current || { landmarks: [] } as any;
          lastResultsRef.current = results;
          
          // SMOOTHING ENTIRE SKELETON (Lerp)
          const smoothingFactor = 0.35; 
          if (results && results.landmarks && results.landmarks.length > 0) {
            const rawHands = results.landmarks;
            const smoothedHands: any[][] = [];

            rawHands.forEach((hand, handIdx) => {
              const prevHand = smoothedLandmarksRef.current[handIdx];
              const smoothedHand: any[] = [];

              hand.forEach((landmark, lmkIdx) => {
                const prevLmk = prevHand ? prevHand[lmkIdx] : null;

                if (prevLmk) {
                  // Interpolate x, y, z
                  smoothedHand[lmkIdx] = {
                    x: prevLmk.x + (landmark.x - prevLmk.x) * smoothingFactor,
                    y: prevLmk.y + (landmark.y - prevLmk.y) * smoothingFactor,
                    z: prevLmk.z + (landmark.z - prevLmk.z) * smoothingFactor
                  };
                } else {
                  smoothedHand[lmkIdx] = { ...landmark };
                }
              });
              smoothedHands[handIdx] = smoothedHand;
            });
            smoothedLandmarksRef.current = smoothedHands;

            // PINCH-TO-SCROLL LOGIC (PAGE SCROLL) - Disabled in Gallery
            const firstHand = smoothedHands[0];
            const thumbTip = firstHand[4];
            const indexTip = firstHand[8];

            // Calculate distance between thumb and index tips
            const distance = Math.sqrt(
              Math.pow(thumbTip.x - indexTip.x, 2) + 
              Math.pow(thumbTip.y - indexTip.y, 2)
            );

            // Pinch Threshold: distance < 0.05
            const isPinchingPage = distance < 0.05;

            if (isPinchingPage && locationRef.current !== '/project') {
              const currentY = (thumbTip.y + indexTip.y) / 2;
              
              if (lastPinchYRef.current !== null) {
                const deltaY = currentY - lastPinchYRef.current;
                const scrollSpeed = window.innerHeight * 2.5; 
                window.scrollBy(0, -deltaY * scrollSpeed);
              }
              lastPinchYRef.current = currentY;
            } else {
              lastPinchYRef.current = null;
            }

            // --- SINGLE HAND GESTURE: PINCH & DRAG TO SCROLL GALLERY ---
            if (isTrackingEnabled && locationRef.current === '/project') {
              let pinchingHand = null;
              
              // Find the first hand that's pinching
              for (const hand of smoothedHands) {
                const dist = Math.sqrt(Math.pow(hand[4].x - hand[8].x, 2) + Math.pow(hand[4].y - hand[8].y, 2));
                if (dist < 0.1) { // Increased threshold for more reliable detection while moving
                  pinchingHand = hand;
                  break;
                }
              }

              if (pinchingHand) {
                const h = pinchingHand;
                const currentPinchX = (h[4].x + h[8].x) / 2;
                const now = performance.now();

                if (singlePinchStartXRef.current === null) {
                  singlePinchStartXRef.current = currentPinchX;
                  lastHandXRef.current = currentPinchX;
                  lastHandTimeRef.current = now;
                  handVelocityXRef.current = 0;
                  galleryRef.current?.setBaseRotation();
                } else {
                  const deltaX = (currentPinchX - singlePinchStartXRef.current) * -1; // Invert to match mirroring
                  const pixelDeltaX = deltaX * window.innerWidth;
                  galleryRef.current?.updateRotation(pixelDeltaX, 0);

                  const dt = now - lastHandTimeRef.current;
                  if (dt > 0 && lastHandXRef.current !== null) {
                    const instantaneousVx = ((currentPinchX - lastHandXRef.current) / dt) * -1; // Invert velocity too
                    handVelocityXRef.current = handVelocityXRef.current * 0.7 + instantaneousVx * 0.3;
                  }
                  lastHandXRef.current = currentPinchX;
                  lastHandTimeRef.current = now;
                }
              } else {
                if (singlePinchStartXRef.current !== null) {
                  // Release inertia
                  const velocityThreshold = 0.0005;
                  if (Math.abs(handVelocityXRef.current) > velocityThreshold) {
                    const vxMultiplier = window.innerWidth * 15; 
                    galleryRef.current?.startInertia(handVelocityXRef.current * vxMultiplier, 0);
                  }
                }
                singlePinchStartXRef.current = null;
                lastHandXRef.current = null;
              }
            } else {
              singlePinchStartXRef.current = null;
              lastHandXRef.current = null;
            }

            // --- TWO HAND GESTURE: PINCH & PULL APART TO TOGGLE GALLERY ---
            if (smoothedHands.length >= 2 && isTrackingEnabled) {
              const h1 = smoothedHands[0];
              const h2 = smoothedHands[1];

              const dist1 = Math.sqrt(Math.pow(h1[4].x - h1[8].x, 2) + Math.pow(h1[4].y - h1[8].y, 2));
              const dist2 = Math.sqrt(Math.pow(h2[4].x - h2[8].x, 2) + Math.pow(h2[4].y - h2[8].y, 2));

              const isPinching1 = dist1 < 0.1;
              const isPinching2 = dist2 < 0.1;

              if (isPinching1 && isPinching2) {
                const p1x = (h1[4].x + h1[8].x) / 2;
                const p1y = (h1[4].y + h1[8].y) / 2;
                const p2x = (h2[4].x + h2[8].x) / 2;
                const p2y = (h2[4].y + h2[8].y) / 2;

                const currentHandDist = Math.sqrt(Math.pow(p1x - p2x, 2) + Math.pow(p1y - p2y, 2));

                if (pinchStartDistRef.current === null) {
                  pinchStartDistRef.current = currentHandDist;
                } else {
                  const delta = Math.abs(currentHandDist - pinchStartDistRef.current);
                  // If pulling apart by more than 15% of screen width (normalized coord space)
                  if (delta > 0.15 && currentHandDist > pinchStartDistRef.current) {
                    if (locationRef.current === '/project') {
                      navigate('/');
                    } else {
                      navigate('/project');
                    }
                    pinchStartDistRef.current = null;
                  }
                }
              } else {
                pinchStartDistRef.current = null;
              }
            } else {
              pinchStartDistRef.current = null;
            }

          } else {
            smoothedLandmarksRef.current = [];
            lastPinchYRef.current = null;
          }

          if (overlayCanvas) {
            const ctx = overlayCanvas.getContext('2d');
            if (ctx) {
              // Draw using smoothed landmarks instead of raw ones
              drawHandSkeleton(ctx, { 
                ...results, 
                landmarks: smoothedLandmarksRef.current 
              } as HandLandmarkerResult);
            }
          }
        } catch (err) {
          console.error(err);
        }
      } else if (overlayCanvas) {
        const ctx = overlayCanvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
      }

      requestRef.current = requestAnimationFrame(renderLoop);
    };
    
    requestRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isCameraActive]);

  return (
    <div className={`relative w-full min-h-screen bg-black overflow-x-hidden ${isTrackingEnabled ? 'cursor-none' : 'cursor-auto'}`}>
      <Navbar 
        trackingEnabled={isTrackingEnabled} 
        onToggleTracking={() => setIsTrackingEnabled(!isTrackingEnabled)} 
      />
      
      {/* Background - Fixed behind content */}
      <div className="fixed inset-0 z-0">
        <LiquidChrome
          baseColor={[0.1, 0.1, 0.1]}
          speed={0.2}
          amplitude={0.6}
          interactive={true}
          externalMouse={null}
        />
      </div>

      {/* Hand Tracking UI - High z-index layer */}
      <div className="fixed inset-0 z-[1000] pointer-events-none">
        <video 
          ref={videoRef}
          autoPlay
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none scale-x-[-1]"
        />
        <canvas 
          ref={overlayCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      </div>

      {/* Main Content Sections */}
      <Routes>
        <Route path="/" element={
          <main className="relative z-10 pt-32 px-4 md:px-8 space-y-32">
            <Hero />
            <div className="max-w-6xl mx-auto">
              <Sections />
            </div>
          </main>
        } />
        
        <Route path="/project" element={
          <div className="fixed inset-0 z-[100] bg-black">
            <DomeGallery
              ref={galleryRef}
              images={PROJECTS.map(p => ({ src: p.image, alt: p.title }))}
              fit={0.8}
              minRadius={600}
              maxVerticalRotationDeg={0}
              segments={24}
              dragDampening={2}
              grayscale
              onClose={() => navigate('/')}
            />
          </div>
        } />
      </Routes>
    </div>
  );
}
