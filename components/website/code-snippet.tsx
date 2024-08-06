"use client";
import { CodeBlock } from "react-code-block";
import { useCopyToClipboard } from "react-use";
import { themes } from "prism-react-renderer";
import { Clipboard, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CodeSnippet = ({
  code,
  language = "jsx",
}: {
  code: string;
  language?: string;
}) => {
  const [state, copyToClipboard] = useCopyToClipboard();

  const copyCode = () => {
    copyToClipboard(code);
  };

  return (
    <div className="relative">
      <CodeBlock code={code} language={language} theme={themes.jettwaveDark}>
        <div>
          <CodeBlock.Code className="bg-gray-900 !p-4 text-sm rounded-xl shadow-lg whitespace-pre overflow-x-scroll">
            <CodeBlock.LineContent>
              <CodeBlock.Token />
            </CodeBlock.LineContent>
          </CodeBlock.Code>
        </div>
      </CodeBlock>

      <Button
        variant="link"
        className="absolute top-2 right-2"
        onClick={copyCode}
      >
        {state.value ? (
          <ClipboardCheck className="text-white h-4 w-4" />
        ) : (
          <Clipboard className="text-white h-4 w-4" />
        )}
      </Button>
    </div>
  );
};
