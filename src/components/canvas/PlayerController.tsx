'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function PlayerController() {
  const { camera, gl } = useThree();
  const keys = useRef<Set<string>>(new Set());
  const mouseDown = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const yaw = useRef(-Math.PI / 2); // face forward
  const pitch = useRef(-0.3);
  const targetPos = useRef(new THREE.Vector3(0, 8, 20));
  const currentPos = useRef(new THREE.Vector3(0, 8, 20));
  const velocity = useRef(new THREE.Vector3());

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => keys.current.add(e.code);
    const onKeyUp = (e: KeyboardEvent) => keys.current.delete(e.code);

    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 0 || e.button === 2) {
        mouseDown.current = true;
        lastMouse.current = { x: e.clientX, y: e.clientY };
      }
    };
    const onMouseUp = () => { mouseDown.current = false; };
    const onMouseMove = (e: MouseEvent) => {
      if (!mouseDown.current) return;
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      yaw.current -= dx * 0.003;
      pitch.current -= dy * 0.003;
      pitch.current = Math.max(-Math.PI / 3, Math.min(Math.PI / 6, pitch.current));
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };

    const onTouch = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const t = e.touches[0];
        lastMouse.current = { x: t.clientX, y: t.clientY };
        mouseDown.current = true;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!mouseDown.current || e.touches.length !== 1) return;
      const t = e.touches[0];
      const dx = t.clientX - lastMouse.current.x;
      const dy = t.clientY - lastMouse.current.y;
      yaw.current -= dx * 0.003;
      pitch.current -= dy * 0.003;
      pitch.current = Math.max(-Math.PI / 3, Math.min(Math.PI / 6, pitch.current));
      lastMouse.current = { x: t.clientX, y: t.clientY };
    };
    const onTouchEnd = () => { mouseDown.current = false; };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    gl.domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);
    gl.domElement.addEventListener('touchstart', onTouch);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    gl.domElement.addEventListener('contextmenu', (e) => e.preventDefault());

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      gl.domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [gl]);

  useFrame((_, delta) => {
    const speed = keys.current.has('ShiftLeft') ? 20 : 10;
    const forward = new THREE.Vector3(
      Math.cos(yaw.current),
      0,
      Math.sin(yaw.current)
    );
    const right = new THREE.Vector3(
      Math.cos(yaw.current + Math.PI / 2),
      0,
      Math.sin(yaw.current + Math.PI / 2)
    );

    const move = new THREE.Vector3();

    if (keys.current.has('KeyW') || keys.current.has('ArrowUp')) move.add(forward);
    if (keys.current.has('KeyS') || keys.current.has('ArrowDown')) move.sub(forward);
    if (keys.current.has('KeyA') || keys.current.has('ArrowLeft')) move.sub(right);
    if (keys.current.has('KeyD') || keys.current.has('ArrowRight')) move.add(right);

    if (move.length() > 0) {
      move.normalize().multiplyScalar(speed * delta);
      targetPos.current.add(move);
    }

    // Clamp to campus bounds
    targetPos.current.x = Math.max(-50, Math.min(50, targetPos.current.x));
    targetPos.current.z = Math.max(-30, Math.min(45, targetPos.current.z));
    targetPos.current.y = Math.max(3, Math.min(25, targetPos.current.y));

    // Smooth follow
    currentPos.current.lerp(targetPos.current, 0.08);
    camera.position.copy(currentPos.current);

    // Apply rotation
    const lookDir = new THREE.Vector3(
      Math.cos(pitch.current) * Math.cos(yaw.current),
      Math.sin(pitch.current),
      Math.cos(pitch.current) * Math.sin(yaw.current)
    );
    const target = currentPos.current.clone().add(lookDir);
    camera.lookAt(target);
  });

  return null;
}
