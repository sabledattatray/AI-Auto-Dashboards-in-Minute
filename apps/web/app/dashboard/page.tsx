import { AppShell } from "@/components/layout/AppShell";
import { Canvas } from "@/components/canvas/Canvas";
import { CanvasToolbar } from "@/components/canvas/CanvasToolbar";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="relative h-full w-full overflow-hidden">
        {/* Canvas Engine */}
        <Canvas />
        
        {/* Floating Toolbar */}
        <CanvasToolbar />
      </div>
    </AppShell>
  );
}
