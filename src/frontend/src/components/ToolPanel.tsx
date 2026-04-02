import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Camera,
  CheckCircle2,
  ChevronDown,
  Clapperboard,
  Download,
  ImageIcon,
  Loader2,
  Upload,
  Video,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { useUploadProductImage } from "../hooks/useQueries";

type GenerationMode = "white-bg" | "cinematic" | "ugc-image" | "ugc-video";
type BgStyle = "studio-white" | "kitchen" | "cafe" | "outdoor";
type OutputQuality = "4k" | "fullhd";

const MODES: {
  id: GenerationMode;
  icon: React.ReactNode;
  label: string;
  desc: string;
}[] = [
  {
    id: "white-bg",
    icon: <ImageIcon className="w-4 h-4" />,
    label: "White Background",
    desc: "Studio-quality white BG",
  },
  {
    id: "cinematic",
    icon: <Clapperboard className="w-4 h-4" />,
    label: "Cinematic Scene",
    desc: "Hollywood-grade 4K lifestyle",
  },
  {
    id: "ugc-image",
    icon: <Camera className="w-4 h-4" />,
    label: "UGC Image",
    desc: "User-generated content style",
  },
  {
    id: "ugc-video",
    icon: <Video className="w-4 h-4" />,
    label: "UGC Video",
    desc: "Storyboard concept frames",
  },
];

const BG_STYLES: { id: BgStyle; label: string }[] = [
  { id: "studio-white", label: "Studio White" },
  { id: "kitchen", label: "Kitchen" },
  { id: "cafe", label: "Cafe" },
  { id: "outdoor", label: "Outdoor" },
];

const QUALITIES: { id: OutputQuality; label: string }[] = [
  { id: "4k", label: "4K Ultra HD" },
  { id: "fullhd", label: "Full HD" },
];

const CSS_FILTERS: Record<GenerationMode, string> = {
  "white-bg":
    "brightness(1.15) contrast(1.05) saturate(0.9) drop-shadow(0 8px 24px rgba(0,0,0,0.12))",
  cinematic:
    "brightness(1.1) contrast(1.2) saturate(1.3) hue-rotate(-5deg) drop-shadow(0 8px 24px rgba(0,0,0,0.25))",
  "ugc-image":
    "brightness(1.05) contrast(1.1) saturate(1.15) drop-shadow(0 4px 16px rgba(0,0,0,0.15))",
  "ugc-video":
    "brightness(1.08) contrast(1.15) saturate(1.2) sepia(0.1) drop-shadow(0 8px 24px rgba(0,0,0,0.2))",
};

export default function ToolPanel() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [mode, setMode] = useState<GenerationMode>("white-bg");
  const [bgStyle, setBgStyle] = useState<BgStyle>("studio-white");
  const [quality, setQuality] = useState<OutputQuality>("4k");
  const [isDragging, setIsDragging] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useUploadProductImage();

  const handleFile = useCallback((f: File) => {
    if (!f.type.match(/^image\/(jpeg|png)/)) {
      toast.error("Please upload a JPG or PNG image.");
      return;
    }
    if (f.size > 20 * 1024 * 1024) {
      toast.error("Image must be under 20MB.");
      return;
    }
    setFile(f);
    setGenerated(false);
    const url = URL.createObjectURL(f);
    setPreview(url);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) handleFile(droppedFile);
    },
    [handleFile],
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const handleGenerate = async () => {
    if (!file || !preview) {
      toast.error("Please upload a product image first.");
      return;
    }
    setIsGenerating(true);
    setUploadProgress(0);

    // Upload to blob storage
    try {
      await uploadMutation.mutateAsync({
        file,
        onProgress: (pct: number) => setUploadProgress(pct),
      });
    } catch {
      // Non-blocking — demo still runs even if blob upload fails
    }

    // Simulate AI generation (2–3 seconds)
    const delay = 2000 + Math.random() * 1000;
    await new Promise((r) => setTimeout(r, delay));

    setIsGenerating(false);
    setGenerated(true);
    toast.success("✓ Image enhanced! Ready to download.");
  };

  const handleDownload = () => {
    if (!preview) return;
    const a = document.createElement("a");
    a.href = preview;
    a.download = `ecomkashu-enhanced-${Date.now()}.jpg`;
    a.click();
  };

  return (
    <Card className="shadow-tool rounded-3xl overflow-hidden border border-border bg-card">
      <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
        {/* ── Column 1: Upload Zone ── */}
        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">1</span>
            </div>
            <h3 className="font-semibold text-sm text-foreground">Upload</h3>
          </div>

          {/* Dropzone as label for accessible file input */}
          <label
            htmlFor="product-file-input"
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={[
              "relative border-2 border-dashed rounded-2xl flex flex-col items-center justify-center",
              "cursor-pointer transition-all duration-200 min-h-[200px]",
              isDragging
                ? "border-primary bg-primary/5"
                : preview
                  ? "border-border bg-muted/30"
                  : "border-border bg-muted/20 hover:border-primary/50 hover:bg-primary/5",
            ].join(" ")}
            data-ocid="tool.dropzone"
          >
            <input
              id="product-file-input"
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              className="hidden"
              onChange={handleFileInput}
              data-ocid="tool.upload_button"
            />

            {preview ? (
              <img
                src={preview}
                alt="Uploaded product for enhancement"
                className="w-full h-full object-contain rounded-xl max-h-[180px]"
              />
            ) : (
              <div className="flex flex-col items-center gap-3 p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <Upload className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Drop your product here
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG or PNG, up to 20MB
                  </p>
                </div>
                <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm border border-border bg-card text-foreground hover:bg-muted/40 transition-colors mt-1">
                  Browse Files
                </span>
              </div>
            )}
          </label>

          {file && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
              <span className="truncate">{file.name}</span>
            </div>
          )}
        </div>

        {/* ── Column 2: Generation Options ── */}
        <div className="p-6 flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">2</span>
            </div>
            <h3 className="font-semibold text-sm text-foreground">
              Choose Style
            </h3>
          </div>

          {/* Mode selector */}
          <div className="flex flex-col gap-2">
            {MODES.map((m) => (
              <button
                type="button"
                key={m.id}
                onClick={() => setMode(m.id)}
                className={[
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-150",
                  mode === m.id
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "bg-muted/40 text-foreground hover:bg-muted/80",
                ].join(" ")}
                data-ocid="tool.tab"
              >
                <span
                  className={
                    mode === m.id
                      ? "text-primary-foreground"
                      : "text-muted-foreground"
                  }
                >
                  {m.icon}
                </span>
                <div>
                  <div className="text-sm font-semibold">{m.label}</div>
                  <div
                    className={`text-xs ${
                      mode === m.id
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {m.desc}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Sub-options */}
          <div className="flex flex-col gap-3 pt-1">
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                Background Style
              </p>
              <div className="flex flex-wrap gap-1.5">
                {BG_STYLES.map((s) => (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => setBgStyle(s.id)}
                    className={[
                      "px-3 py-1 rounded-full text-xs font-medium transition-all duration-150",
                      bgStyle === s.id
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground hover:bg-muted/80",
                    ].join(" ")}
                    data-ocid="tool.toggle"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                Output Quality
              </p>
              <div className="flex gap-1.5">
                {QUALITIES.map((q) => (
                  <button
                    type="button"
                    key={q.id}
                    onClick={() => setQuality(q.id)}
                    className={[
                      "px-3 py-1 rounded-full text-xs font-medium transition-all duration-150",
                      quality === q.id
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground hover:bg-muted/80",
                    ].join(" ")}
                    data-ocid="tool.toggle"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Column 3: Output Preview ── */}
        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">3</span>
            </div>
            <h3 className="font-semibold text-sm text-foreground">
              Preview &amp; Download
            </h3>
            {quality === "4k" && (
              <Badge variant="secondary" className="text-xs ml-auto">
                4K
              </Badge>
            )}
          </div>

          {/* Before/After preview */}
          <div className="grid grid-cols-2 gap-2 flex-1">
            {/* Before */}
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground font-medium">
                Original
              </span>
              <div className="bg-muted/30 rounded-xl overflow-hidden aspect-square flex items-center justify-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="Original product before enhancement"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
                  </div>
                )}
              </div>
            </div>

            {/* After */}
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground font-medium">
                Enhanced 4K
              </span>
              <div className="bg-muted/30 rounded-xl overflow-hidden aspect-square flex items-center justify-center relative">
                <AnimatePresence mode="wait">
                  {isGenerating ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0"
                      data-ocid="tool.loading_state"
                    >
                      <div className="shimmer w-full h-full" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        <Loader2 className="w-6 h-6 text-primary animate-spin" />
                        <span className="text-xs text-muted-foreground">
                          {uploadProgress < 100 && uploadProgress > 0
                            ? `Uploading ${uploadProgress}%`
                            : "Enhancing..."}
                        </span>
                      </div>
                    </motion.div>
                  ) : generated && preview ? (
                    <motion.img
                      key="result"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      src={preview}
                      alt="AI-enhanced product result"
                      className="w-full h-full object-contain"
                      style={{ filter: CSS_FILTERS[mode] }}
                      data-ocid="tool.success_state"
                    />
                  ) : (
                    <motion.div
                      key="empty"
                      className="w-full h-full flex items-center justify-center"
                      data-ocid="tool.empty_state"
                    >
                      <div className="text-center p-4">
                        <div className="text-2xl mb-2">✨</div>
                        <p className="text-xs text-muted-foreground">
                          Enhanced result will appear here
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Generate button */}
          <Button
            className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 mt-auto"
            onClick={handleGenerate}
            disabled={isGenerating || !file}
            data-ocid="tool.submit_button"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Enhancing...
              </>
            ) : (
              <>
                <span className="sparkle mr-2">✨</span>
                Generate Enhanced
              </>
            )}
          </Button>

          {/* Download button */}
          <AnimatePresence>
            {generated && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <Button
                  variant="outline"
                  className="w-full rounded-full gap-2"
                  onClick={handleDownload}
                  data-ocid="tool.secondary_button"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
                <p className="text-center text-xs text-green-600 mt-2 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Generated! Download your result
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <ChevronDown className="w-4 h-4 text-muted-foreground/30 mx-auto" />
        </div>
      </div>
    </Card>
  );
}
