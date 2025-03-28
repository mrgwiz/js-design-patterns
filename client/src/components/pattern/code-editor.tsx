import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/lib/hooks/use-theme";
import { Play, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as monaco from "monaco-editor";

// Initialize Monaco environment
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

// Register workers
self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker();
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker();
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker();
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }
    return new editorWorker();
  }
};

interface CodeEditorProps {
  initialCode: string;
  language: string;
}

export default function CodeEditor({ initialCode, language }: CodeEditorProps) {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>(
    "// Output will appear here after you run your code",
  );
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("code");
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(
    null,
  );

  useEffect(() => {
    if (editorContainerRef.current) {
      const editor = monaco.editor.create(editorContainerRef.current, {
        value: initialCode,
        language: language,
        theme: theme === "dark" ? "vs-dark" : "vs",
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 14,
        fontFamily: "JetBrains Mono, monospace",
        lineHeight: 1.5,
        padding: { top: 16 },
      });

      editorInstanceRef.current = editor;

      editor.onDidChangeModelContent(() => {
        setCode(editor.getValue());
      });

      return () => {
        editor.dispose();
      };
    }
  }, [initialCode, language, theme]);

  useEffect(() => {
    if (editorInstanceRef.current) {
      monaco.editor.setTheme(theme === "dark" ? "vs-dark" : "vs");
    }
  }, [theme]);

  const runCode = () => {
    setIsRunning(true);
    setActiveTab("output");

    const originalConsoleLog = console.log;
    let outputBuffer: any[] = [];

    console.log = (...args) => {
      outputBuffer.push(
        args
          .map((arg) =>
            typeof arg === "object"
              ? JSON.stringify(arg, null, 2)
              : String(arg),
          )
          .join(" "),
      );
    };

    setTimeout(() => {
      try {
        setOutput("");

        const sandboxFunc = new Function(`
          try {
            ${code}
            return { success: true };
          } catch (error) {
            return { success: false, error: error.message };
          }
        `);

        const result = sandboxFunc();

        if (result.success) {
          setOutput(
            outputBuffer.join("\n") ||
              "// Code executed successfully but had no output",
          );
        } else {
          setOutput(`// Error: ${result.error}`);
          toast({
            title: "Execution Error",
            description: result.error,
            variant: "destructive",
          });
        }
      } catch (error) {
        setOutput(
          `// Error: ${error instanceof Error ? error.message : String(error)}`,
        );
        toast({
          title: "Error",
          description: "Failed to execute code",
          variant: "destructive",
        });
      } finally {
        console.log = originalConsoleLog;
        setIsRunning(false);
      }
    }, 100);
  };

  return (
    <div className="mb-8 space-y-4 border border-border rounded-md overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex items-center justify-between px-4 py-2 bg-accent bg-opacity-10">
          <div className="flex justify-between items-center w-full">
            <TabsList>
              <TabsTrigger value="code">Code Editor</TabsTrigger>
              <TabsTrigger value="output">Output</TabsTrigger>
            </TabsList>
            <Button
              onClick={runCode}
              disabled={isRunning}
              size="sm"
              className="bg-primary hover:bg-primary/90"
            >
              {isRunning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Run Code
                </>
              )}
            </Button>
          </div>
        </div>

        <TabsContent value="code" className="m-0">
          <div
            ref={editorContainerRef}
            className="h-64 border-t border-border"
          />
        </TabsContent>

        <TabsContent value="output" className="m-0">
          <div className="h-64 font-mono p-4 text-sm overflow-y-auto border-t border-border bg-accent bg-opacity-5">
            <pre className="whitespace-pre-wrap">{output}</pre>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
