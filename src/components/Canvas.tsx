"use client";
import React, { useEffect, useRef } from "react";
import { useFlow } from "../hooks/useFlow";

export const Canvas: React.FC = () => {
  const {
    worldRef, svgRef, minimapRef,
    addNodeFromPalette, select, onNodeMouseDown, onWheelZoom,
    onMouseMove, onMouseUp, onCanvasMouseDown, onCanvasClick,
    draw, drawMinimap, screenToWorld, state,
    toggleMode, removeSelection, duplicateSelection, groupIntoVPC, setSpacePressed
  } = useFlow();


  // Document-level drag and drop (fallback)
  useEffect(() => {
    const onDragOver = (e: DragEvent) => { e.preventDefault(); };
    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      const raw = e.dataTransfer?.getData('application/json');
      if (!raw) return;
      try { 
        const item = JSON.parse(raw);
        const worldPos = screenToWorld({ x: e.clientX, y: e.clientY });
        addNodeFromPalette(item.type, worldPos.x, worldPos.y);
      } catch {}
    };
    document.addEventListener('dragover', onDragOver, false);
    document.addEventListener('drop', onDrop, false);
    return () => {
      document.removeEventListener('dragover', onDragOver, false);
      document.removeEventListener('drop', onDrop, false);
    };
  }, [addNodeFromPalette, screenToWorld]);

  // Redraw when nodes, edges, or pan changes
  useEffect(() => {
    draw();
    drawMinimap();
  }, [state.nodes, state.edges, state.pan, draw, drawMinimap]);


  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  // keyboard shortcuts
  useEffect(() => {
    
const onKeyDown = (e: KeyboardEvent) => {
  const ae = document.activeElement as HTMLElement | null;
  const tag = ae?.tagName?.toLowerCase();
  const typing = ae && (tag === 'input' || tag === 'textarea' || tag === 'select' || ae.isContentEditable);
  if (typing) return;

      if (e.code === "Space") { 
        document.body.style.cursor = "grab"; 
        setSpacePressed(true); 
      }
      if (e.key === "c" || e.key === "C") toggleMode();
      if (e.key === "Delete" || e.key === "Backspace") removeSelection();
      if (e.key === "d" || e.key === "D") duplicateSelection();
      if (e.key === "g" || e.key === "G") groupIntoVPC();
    };
    const onKeyUp = (e: KeyboardEvent) => { 
      if (e.code === "Space") { 
        document.body.style.cursor = "default"; 
        setSpacePressed(false); 
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [toggleMode, removeSelection, duplicateSelection, groupIntoVPC, setSpacePressed]);

  return (
    <>
  <svg className="edges" ref={svgRef} />
  <div 
    className="world" 
    ref={worldRef} 
    onClick={() => select(null)}
    onMouseDown={(e) => onCanvasMouseDown(e)}
    onWheel={onWheelZoom}
  />
  <div
    className="overlay"
    onClick={onCanvasClick}
  />
  <div className="minimap"><canvas ref={minimapRef} /></div>
</>

);
};
