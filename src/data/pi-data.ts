// Static data extracted from pi-mono v0.64.0 source code
// Repository: https://github.com/badlogic/pi-mono

export const PI_VERSION = "0.64.0";
export const PI_REPO = "https://github.com/badlogic/pi-mono";
export const PI_SITE = "https://pi.dev";

// ============================================================================
// Agent Loop Steps
// ============================================================================

export interface AgentLoopStep {
  id: string;
  title: string;
  description: string;
  sourceFile: string;
  sourceLink: string;
  details: string[];
}

export const agentLoopSteps: AgentLoopStep[] = [
  {
    id: "input",
    title: "User Input",
    description: "Message entered in the TUI editor or via print mode / RPC / SDK",
    sourceFile: "modes/interactive/components/user-message.ts",
    sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/modes/interactive/components/user-message.ts`,
    details: [
      "Supports steering messages (Enter) delivered mid-turn",
      "Follow-up messages (Alt+Enter) queued until agent finishes",
      "Slash commands (/model, /tree, etc.) intercepted before agent loop",
      "Prompt templates expanded inline from markdown files",
      "Image paste via Ctrl+V with EXIF orientation correction",
    ],
  },
  {
    id: "context",
    title: "Context Assembly",
    description: "System prompt built from tools, guidelines, AGENTS.md files, skills, and extensions",
    sourceFile: "core/system-prompt.ts",
    sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/system-prompt.ts`,
    details: [
      "AGENTS.md loaded from ~/.pi/agent/, parent dirs, and cwd",
      "SYSTEM.md can replace or append to the default system prompt",
      "Skills formatted as available_skills with descriptions",
      "Extension-registered tools get prompt snippets and guidelines",
      "Custom context via extensions: inject messages, filter history, RAG",
    ],
  },
  {
    id: "extensions",
    title: "Extension Hooks",
    description: "beforeTurn and transformContext hooks fire before the LLM call",
    sourceFile: "core/extensions/runner.ts",
    sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/extensions/runner.ts`,
    details: [
      "beforeTurn: inject context, modify messages, gate execution",
      "transformContext: filter/rewrite message history for the LLM",
      "Dynamic resources injected as system messages each turn",
      "Extensions can abort the turn or redirect to different models",
    ],
  },
  {
    id: "llm-stream",
    title: "LLM Streaming",
    description: "AgentMessage[] converted to Message[], streamed via the selected provider",
    sourceFile: "agent/src/agent-loop.ts",
    sourceLink: `${PI_REPO}/blob/main/packages/agent/src/agent-loop.ts`,
    details: [
      "convertToLlm transforms agent messages to provider-compatible format",
      "streamSimple() dispatches to the correct provider (Anthropic, OpenAI, etc.)",
      "Events emitted: text_start, text_delta, thinking_start, toolcall_start, etc.",
      "API key resolved fresh each turn (handles expiring tokens)",
      "Supports thinking levels: off, minimal, low, medium, high, xhigh",
    ],
  },
  {
    id: "tool-execution",
    title: "Tool Execution",
    description: "Tool calls validated, hooks fired, then executed sequentially or in parallel",
    sourceFile: "agent/src/agent-loop.ts",
    sourceLink: `${PI_REPO}/blob/main/packages/agent/src/agent-loop.ts`,
    details: [
      "Arguments validated against TypeBox schemas",
      "beforeToolCall hook can block execution with a reason",
      "Tools execute with AbortSignal and streaming update callbacks",
      "afterToolCall hook can modify results or override error status",
      "Sequential (default) or parallel execution per config",
    ],
  },
  {
    id: "steering",
    title: "Steering & Follow-up",
    description: "Check for pending steering/follow-up messages between turns",
    sourceFile: "agent/src/agent-loop.ts",
    sourceLink: `${PI_REPO}/blob/main/packages/agent/src/agent-loop.ts`,
    details: [
      "Steering messages injected before next assistant response",
      "If no tool calls remain, check for follow-up messages",
      "Follow-ups restart the outer loop with new user context",
      "Agent ends only when no tool calls AND no pending messages",
    ],
  },
  {
    id: "compaction",
    title: "Compaction Check",
    description: "If context approaches the limit, auto-compact summarizes older messages",
    sourceFile: "core/compaction/compaction.ts",
    sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/compaction/compaction.ts`,
    details: [
      "Triggered when estimated tokens exceed threshold for model's context window",
      "Summarizes older messages while preserving recent context",
      "Branch summarization for tree-structured sessions",
      "Fully customizable via extensions: topic-based, code-aware, different models",
      "Manual trigger via /compact command",
    ],
  },
  {
    id: "render",
    title: "Render Response",
    description: "Agent response rendered in the TUI with tool results, diffs, and markdown",
    sourceFile: "modes/interactive/components/assistant-message.ts",
    sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/modes/interactive/components/assistant-message.ts`,
    details: [
      "Markdown rendered with syntax highlighting",
      "Tool results have custom renderers (diffs for edit, file trees for ls, etc.)",
      "Thinking blocks collapsible via Ctrl+T",
      "Tool output expandable via Ctrl+O",
      "Session persisted after each message for crash recovery",
    ],
  },
];

// ============================================================================
// Architecture / Source Tree
// ============================================================================

export interface PackageInfo {
  name: string;
  description: string;
  fileCount: number;
  path: string;
  sourceLink: string;
  directories: DirectoryInfo[];
}

export interface DirectoryInfo {
  name: string;
  description: string;
  fileCount: number;
}

export const packages: PackageInfo[] = [
  {
    name: "coding-agent",
    description: "The main pi CLI — TUI, sessions, extensions, tools, commands, and all interactive features",
    fileCount: 124,
    path: "packages/coding-agent",
    sourceLink: `${PI_REPO}/tree/main/packages/coding-agent/src`,
    directories: [
      { name: "core/", description: "Agent session, system prompt, tools, extensions, compaction, skills", fileCount: 48 },
      { name: "core/tools/", description: "Built-in tools: read, bash, edit, write, grep, find, ls", fileCount: 14 },
      { name: "core/extensions/", description: "Extension loader, runner, type system, wrapper", fileCount: 5 },
      { name: "core/compaction/", description: "Context compaction and branch summarization", fileCount: 4 },
      { name: "core/export-html/", description: "Session export to standalone HTML", fileCount: 3 },
      { name: "modes/interactive/", description: "Full TUI mode with all visual components", fileCount: 30 },
      { name: "modes/", description: "Print mode (one-shot) and RPC mode (JSON protocol)", fileCount: 3 },
      { name: "cli/", description: "CLI argument parsing, model listing, session picker", fileCount: 6 },
      { name: "utils/", description: "Git, clipboard, image processing, shell, MIME detection", fileCount: 16 },
    ],
  },
  {
    name: "ai",
    description: "Multi-provider LLM streaming library — 15+ providers, unified event stream, tool support",
    fileCount: 43,
    path: "packages/ai",
    sourceLink: `${PI_REPO}/tree/main/packages/ai/src`,
    directories: [
      { name: "providers/", description: "Anthropic, OpenAI, Google, Azure, Bedrock, Mistral, Groq, Cerebras, xAI, etc.", fileCount: 17 },
      { name: "src/", description: "Core types, context, model definitions, event streams, token counting", fileCount: 26 },
    ],
  },
  {
    name: "agent",
    description: "Provider-agnostic agent loop — message processing, tool dispatch, steering",
    fileCount: 5,
    path: "packages/agent",
    sourceLink: `${PI_REPO}/tree/main/packages/agent/src`,
    directories: [
      { name: "src/", description: "Agent loop, types, proxy, core abstractions", fileCount: 5 },
    ],
  },
  {
    name: "tui",
    description: "Terminal UI framework — editor, overlays, selectors, borders, theming",
    fileCount: 25,
    path: "packages/tui",
    sourceLink: `${PI_REPO}/tree/main/packages/tui/src`,
    directories: [
      { name: "src/", description: "TUI core, editor, overlay system, themes, keybindings", fileCount: 25 },
    ],
  },
  {
    name: "web-ui",
    description: "Browser-based session viewer for exported and shared sessions",
    fileCount: 71,
    path: "packages/web-ui",
    sourceLink: `${PI_REPO}/tree/main/packages/web-ui/src`,
    directories: [
      { name: "src/", description: "React components for rendering pi sessions in the browser", fileCount: 71 },
    ],
  },
  {
    name: "mom",
    description: "Session sharing backend — GitHub Gist integration for /share",
    fileCount: 16,
    path: "packages/mom",
    sourceLink: `${PI_REPO}/tree/main/packages/mom/src`,
    directories: [
      { name: "src/", description: "API routes, gist management, session rendering", fileCount: 16 },
    ],
  },
  {
    name: "pods",
    description: "Remote execution pods for sandboxed agent sessions",
    fileCount: 9,
    path: "packages/pods",
    sourceLink: `${PI_REPO}/tree/main/packages/pods/src`,
    directories: [
      { name: "src/", description: "Pod lifecycle, container management, remote sessions", fileCount: 9 },
    ],
  },
];

// ============================================================================
// Built-in Tools
// ============================================================================

export interface ToolInfo {
  name: string;
  description: string;
  category: string;
  sourceFile: string;
  sourceLink: string;
  parameters: { name: string; type: string; required: boolean; description: string }[];
  promptSnippet: string;
}

export const tools: ToolInfo[] = [
  {
    name: "read",
    description: "Read file contents with optional line range. Supports text files and images (sent as attachments). Output truncated to 2000 lines or 50KB.",
    category: "File System",
    sourceFile: "core/tools/read.ts",
    sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/tools/read.ts`,
    parameters: [
      { name: "path", type: "string", required: true, description: "Path to the file to read (relative or absolute)" },
      { name: "offset", type: "number", required: false, description: "Line number to start reading from (1-indexed)" },
      { name: "limit", type: "number", required: false, description: "Maximum number of lines to read" },
    ],
    promptSnippet: "Read file contents",
  },
  {
    name: "bash",
    description: "Execute a bash command in the current working directory. Returns stdout and stderr. Output truncated to last 2000 lines or 50KB.",
    category: "Execution",
    sourceFile: "core/tools/bash.ts",
    sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/tools/bash.ts`,
    parameters: [
      { name: "command", type: "string", required: true, description: "Bash command to execute" },
      { name: "timeout", type: "number", required: false, description: "Timeout in seconds (optional, no default timeout)" },
    ],
    promptSnippet: "Execute bash commands",
  },
  {
    name: "edit",
    description: "Edit a single file using exact text replacement. Every edit must match a unique, non-overlapping region. Multiple edits in one call.",
    category: "File System",
    sourceFile: "core/tools/edit.ts",
    sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/tools/edit.ts`,
    parameters: [
      { name: "path", type: "string", required: true, description: "Path to the file to edit" },
      { name: "edits", type: "array", required: true, description: "Array of {oldText, newText} replacements" },
    ],
    promptSnippet: "Make precise file edits with exact text replacement",
  },
  {
    name: "write",
    description: "Write content to a file. Creates the file if it doesn't exist, overwrites if it does. Automatically creates parent directories.",
    category: "File System",
    sourceFile: "core/tools/write.ts",
    sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/tools/write.ts`,
    parameters: [
      { name: "path", type: "string", required: true, description: "Path to the file to write" },
      { name: "content", type: "string", required: true, description: "Content to write to the file" },
    ],
    promptSnippet: "Create or overwrite files",
  },
  {
    name: "grep",
    description: "Search file contents using regex or literal patterns. Respects .gitignore. Supports glob filtering and case-insensitive search.",
    category: "Search",
    sourceFile: "core/tools/grep.ts",
    sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/tools/grep.ts`,
    parameters: [
      { name: "pattern", type: "string", required: true, description: "Search pattern (regex or literal string)" },
      { name: "path", type: "string", required: false, description: "Directory or file to search" },
      { name: "glob", type: "string", required: false, description: "Filter files by glob pattern" },
      { name: "ignoreCase", type: "boolean", required: false, description: "Case-insensitive search" },
      { name: "literal", type: "boolean", required: false, description: "Treat pattern as literal string" },
    ],
    promptSnippet: "Search file contents with regex",
  },
  {
    name: "find",
    description: "Find files by glob pattern. Respects .gitignore. Returns matching file paths up to a configurable limit.",
    category: "Search",
    sourceFile: "core/tools/find.ts",
    sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/tools/find.ts`,
    parameters: [
      { name: "pattern", type: "string", required: true, description: "Glob pattern to match files" },
      { name: "path", type: "string", required: false, description: "Directory to search in" },
      { name: "limit", type: "number", required: false, description: "Maximum number of results (default: 1000)" },
    ],
    promptSnippet: "Find files by glob pattern",
  },
  {
    name: "ls",
    description: "List directory contents with file sizes and types. Returns structured output up to a configurable limit.",
    category: "File System",
    sourceFile: "core/tools/ls.ts",
    sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/tools/ls.ts`,
    parameters: [
      { name: "path", type: "string", required: false, description: "Directory to list" },
      { name: "limit", type: "number", required: false, description: "Maximum number of entries (default: 500)" },
    ],
    promptSnippet: "List directory contents",
  },
];

// ============================================================================
// Slash Commands
// ============================================================================

export interface CommandInfo {
  name: string;
  description: string;
  category: string;
  sourceLink: string;
}

export const commands: CommandInfo[] = [
  { name: "/model", description: "Select model (opens selector UI)", category: "Model & Provider", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/slash-commands.ts` },
  { name: "/scoped-models", description: "Enable/disable models for Ctrl+P cycling", category: "Model & Provider", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/slash-commands.ts` },
  { name: "/settings", description: "Open settings menu", category: "Configuration", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/slash-commands.ts` },
  { name: "/tree", description: "Navigate session tree (switch branches)", category: "Session", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/slash-commands.ts` },
  { name: "/fork", description: "Create a new fork from a previous message", category: "Session", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/slash-commands.ts` },
  { name: "/new", description: "Start a new session", category: "Session", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/slash-commands.ts` },
  { name: "/resume", description: "Resume a different session", category: "Session", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/slash-commands.ts` },
  { name: "/session", description: "Show session info and stats", category: "Session", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/slash-commands.ts` },
  { name: "/name", description: "Set session display name", category: "Session", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/slash-commands.ts` },
  { name: "/export", description: "Export session (HTML default, or specify path: .html/.jsonl)", category: "Sharing", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/slash-commands.ts` },
  { name: "/import", description: "Import and resume a session from a JSONL file", category: "Sharing", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/slash-commands.ts` },
  { name: "/share", description: "Share session as a secret GitHub gist", category: "Sharing", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/slash-commands.ts` },
  { name: "/copy", description: "Copy last agent message to clipboard", category: "Sharing", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/slash-commands.ts` },
  { name: "/compact", description: "Manually compact the session context", category: "Context", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/slash-commands.ts` },
  { name: "/changelog", description: "Show changelog entries", category: "Info", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/slash-commands.ts` },
  { name: "/hotkeys", description: "Show all keyboard shortcuts", category: "Info", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/slash-commands.ts` },
  { name: "/login", description: "Login with OAuth provider", category: "Auth", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/slash-commands.ts` },
  { name: "/logout", description: "Logout from OAuth provider", category: "Auth", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/slash-commands.ts` },
  { name: "/reload", description: "Reload keybindings, extensions, skills, prompts, and themes", category: "Configuration", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/slash-commands.ts` },
  { name: "/quit", description: "Quit pi", category: "Configuration", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/core/slash-commands.ts` },
];

// ============================================================================
// Extensions
// ============================================================================

export interface ExtensionInfo {
  name: string;
  description: string;
  category: string;
  sourceLink: string;
  isDirectory: boolean;
}

export const extensions: ExtensionInfo[] = [
  // UI & Appearance
  { name: "custom-header", description: "Replace the startup header with a custom component", category: "UI & Appearance", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/custom-header.ts`, isDirectory: false },
  { name: "custom-footer", description: "Replace the footer/status bar with a custom component", category: "UI & Appearance", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/custom-footer.ts`, isDirectory: false },
  { name: "status-line", description: "Add a persistent status line showing custom info", category: "UI & Appearance", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/status-line.ts`, isDirectory: false },
  { name: "titlebar-spinner", description: "Animated spinner in the terminal titlebar during streaming", category: "UI & Appearance", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/titlebar-spinner.ts`, isDirectory: false },
  { name: "rainbow-editor", description: "Rainbow-colored text in the input editor", category: "UI & Appearance", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/rainbow-editor.ts`, isDirectory: false },
  { name: "minimal-mode", description: "Strip pi down to a minimal interface", category: "UI & Appearance", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/minimal-mode.ts`, isDirectory: false },
  { name: "widget-placement", description: "Demo of above-editor and below-editor widget slots", category: "UI & Appearance", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/widget-placement.ts`, isDirectory: false },
  { name: "message-renderer", description: "Custom rendering for assistant messages", category: "UI & Appearance", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/message-renderer.ts`, isDirectory: false },
  { name: "built-in-tool-renderer", description: "Override how built-in tool results are displayed", category: "UI & Appearance", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/built-in-tool-renderer.ts`, isDirectory: false },
  { name: "hidden-thinking-label", description: "Customize the collapsed thinking block label", category: "UI & Appearance", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/hidden-thinking-label.ts`, isDirectory: false },
  { name: "model-status", description: "Show current model info in the status bar", category: "UI & Appearance", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/model-status.ts`, isDirectory: false },
  { name: "mac-system-theme", description: "Auto-switch pi theme based on macOS dark/light mode", category: "UI & Appearance", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/mac-system-theme.ts`, isDirectory: false },
  { name: "dynamic-border", description: "Dynamic border styling based on agent state", category: "UI & Appearance", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/src/modes/interactive/components/dynamic-border.ts`, isDirectory: false },

  // Tools & Capabilities
  { name: "tools", description: "Register custom LLM-callable tools with TypeBox schemas", category: "Tools & Capabilities", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/tools.ts`, isDirectory: false },
  { name: "dynamic-tools", description: "Dynamically add/remove tools during a session", category: "Tools & Capabilities", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/dynamic-tools.ts`, isDirectory: false },
  { name: "tool-override", description: "Override built-in tool behavior", category: "Tools & Capabilities", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/tool-override.ts`, isDirectory: false },
  { name: "truncated-tool", description: "Tool with truncated output handling", category: "Tools & Capabilities", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/truncated-tool.ts`, isDirectory: false },
  { name: "ssh", description: "Execute commands on remote machines via SSH", category: "Tools & Capabilities", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/ssh.ts`, isDirectory: false },
  { name: "antigravity-image-gen", description: "Image generation tool using AI APIs", category: "Tools & Capabilities", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/antigravity-image-gen.ts`, isDirectory: false },

  // Commands & Input
  { name: "commands", description: "Register custom slash commands", category: "Commands & Input", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/commands.ts`, isDirectory: false },
  { name: "input-transform", description: "Transform user input before it reaches the agent", category: "Commands & Input", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/input-transform.ts`, isDirectory: false },
  { name: "send-user-message", description: "Programmatically inject user messages", category: "Commands & Input", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/send-user-message.ts`, isDirectory: false },
  { name: "modal-editor", description: "Vim-style modal editing in the input editor", category: "Commands & Input", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/modal-editor.ts`, isDirectory: false },
  { name: "inline-bash", description: "Execute bash commands inline from the editor", category: "Commands & Input", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/inline-bash.ts`, isDirectory: false },
  { name: "interactive-shell", description: "Interactive shell session within pi", category: "Commands & Input", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/interactive-shell.ts`, isDirectory: false },

  // Session & Workflow
  { name: "auto-commit-on-exit", description: "Automatically git commit when exiting pi", category: "Session & Workflow", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/auto-commit-on-exit.ts`, isDirectory: false },
  { name: "git-checkpoint", description: "Create git checkpoints before destructive operations", category: "Session & Workflow", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/git-checkpoint.ts`, isDirectory: false },
  { name: "session-name", description: "Auto-name sessions based on content", category: "Session & Workflow", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/session-name.ts`, isDirectory: false },
  { name: "bookmark", description: "Bookmark important points in the session tree", category: "Session & Workflow", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/bookmark.ts`, isDirectory: false },
  { name: "todo", description: "Track TODO items across sessions", category: "Session & Workflow", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/todo.ts`, isDirectory: false },
  { name: "summarize", description: "Summarize session content on demand", category: "Session & Workflow", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/summarize.ts`, isDirectory: false },
  { name: "trigger-compact", description: "Custom compaction trigger logic", category: "Session & Workflow", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/trigger-compact.ts`, isDirectory: false },
  { name: "custom-compaction", description: "Implement topic-based or code-aware context compaction", category: "Session & Workflow", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/custom-compaction.ts`, isDirectory: false },
  { name: "file-trigger", description: "Watch files and trigger actions on changes", category: "Session & Workflow", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/file-trigger.ts`, isDirectory: false },

  // Safety & Guards
  { name: "permission-gate", description: "Require user confirmation before tool execution", category: "Safety & Guards", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/permission-gate.ts`, isDirectory: false },
  { name: "protected-paths", description: "Block modifications to specified file paths", category: "Safety & Guards", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/protected-paths.ts`, isDirectory: false },
  { name: "confirm-destructive", description: "Confirm before destructive bash commands (rm, etc.)", category: "Safety & Guards", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/confirm-destructive.ts`, isDirectory: false },
  { name: "timed-confirm", description: "Auto-approve after countdown timer", category: "Safety & Guards", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/timed-confirm.ts`, isDirectory: false },
  { name: "dirty-repo-guard", description: "Warn or block when the git repo has uncommitted changes", category: "Safety & Guards", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/dirty-repo-guard.ts`, isDirectory: false },
  { name: "sandbox", description: "Run tool execution in a sandboxed environment", category: "Safety & Guards", sourceLink: `${PI_REPO}/tree/main/packages/coding-agent/examples/extensions/sandbox`, isDirectory: true },
  { name: "bash-spawn-hook", description: "Hook into bash process spawning for monitoring or filtering", category: "Safety & Guards", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/bash-spawn-hook.ts`, isDirectory: false },

  // Context & Providers
  { name: "dynamic-resources", description: "Inject dynamic context (files, URLs, data) each turn", category: "Context & Providers", sourceLink: `${PI_REPO}/tree/main/packages/coding-agent/examples/extensions/dynamic-resources`, isDirectory: true },
  { name: "system-prompt-header", description: "Prepend custom instructions to the system prompt", category: "Context & Providers", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/system-prompt-header.ts`, isDirectory: false },
  { name: "claude-rules", description: "Load Claude Code .claude/rules as additional context", category: "Context & Providers", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/claude-rules.ts`, isDirectory: false },
  { name: "provider-payload", description: "Inspect the raw provider payload before sending", category: "Context & Providers", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/provider-payload.ts`, isDirectory: false },
  { name: "custom-provider-anthropic", description: "Custom Anthropic provider with modified behavior", category: "Context & Providers", sourceLink: `${PI_REPO}/tree/main/packages/coding-agent/examples/extensions/custom-provider-anthropic`, isDirectory: true },
  { name: "custom-provider-gitlab-duo", description: "GitLab Duo as a custom provider", category: "Context & Providers", sourceLink: `${PI_REPO}/tree/main/packages/coding-agent/examples/extensions/custom-provider-gitlab-duo`, isDirectory: true },
  { name: "custom-provider-qwen-cli", description: "Qwen CLI as a custom provider", category: "Context & Providers", sourceLink: `${PI_REPO}/tree/main/packages/coding-agent/examples/extensions/custom-provider-qwen-cli`, isDirectory: true },
  { name: "handoff", description: "Hand off conversation to a different model mid-session", category: "Context & Providers", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/handoff.ts`, isDirectory: false },

  // Multi-Agent & Advanced
  { name: "subagent", description: "Spawn child pi instances as sub-agents", category: "Multi-Agent & Advanced", sourceLink: `${PI_REPO}/tree/main/packages/coding-agent/examples/extensions/subagent`, isDirectory: true },
  { name: "plan-mode", description: "Plan-then-execute workflow with approval gates", category: "Multi-Agent & Advanced", sourceLink: `${PI_REPO}/tree/main/packages/coding-agent/examples/extensions/plan-mode`, isDirectory: true },
  { name: "rpc-demo", description: "Demo of the RPC protocol for external integration", category: "Multi-Agent & Advanced", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/rpc-demo.ts`, isDirectory: false },
  { name: "reload-runtime", description: "Hot-reload the agent runtime without restarting", category: "Multi-Agent & Advanced", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/reload-runtime.ts`, isDirectory: false },
  { name: "shutdown-command", description: "Programmatic graceful shutdown", category: "Multi-Agent & Advanced", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/shutdown-command.ts`, isDirectory: false },

  // Fun & Demo
  { name: "hello", description: "Minimal hello-world extension", category: "Fun & Demo", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/hello.ts`, isDirectory: false },
  { name: "pirate", description: "Make pi talk like a pirate", category: "Fun & Demo", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/pirate.ts`, isDirectory: false },
  { name: "doom-overlay", description: "Yes, DOOM runs inside pi", category: "Fun & Demo", sourceLink: `${PI_REPO}/tree/main/packages/coding-agent/examples/extensions/doom-overlay`, isDirectory: true },
  { name: "snake", description: "Snake game as a pi overlay", category: "Fun & Demo", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/snake.ts`, isDirectory: false },
  { name: "space-invaders", description: "Space Invaders in your terminal agent", category: "Fun & Demo", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/space-invaders.ts`, isDirectory: false },
  { name: "overlay-test", description: "Test overlay rendering and positioning", category: "Fun & Demo", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/overlay-test.ts`, isDirectory: false },
  { name: "overlay-qa-tests", description: "QA test suite for overlays", category: "Fun & Demo", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/overlay-qa-tests.ts`, isDirectory: false },

  // Events & Lifecycle
  { name: "event-bus", description: "Subscribe to and emit custom events across extensions", category: "Events & Lifecycle", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/event-bus.ts`, isDirectory: false },
  { name: "notify", description: "Desktop notifications on agent events", category: "Events & Lifecycle", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/notify.ts`, isDirectory: false },
  { name: "preset", description: "Load predefined configurations and tool sets", category: "Events & Lifecycle", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/preset.ts`, isDirectory: false },
  { name: "qna", description: "Question and answer flow with the user", category: "Events & Lifecycle", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/qna.ts`, isDirectory: false },
  { name: "question", description: "Prompt the user with a question dialog", category: "Events & Lifecycle", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/question.ts`, isDirectory: false },
  { name: "questionnaire", description: "Multi-step questionnaire flow", category: "Events & Lifecycle", sourceLink: `${PI_REPO}/blob/main/packages/coding-agent/examples/extensions/questionnaire.ts`, isDirectory: false },
  { name: "with-deps", description: "Extension with npm dependencies", category: "Events & Lifecycle", sourceLink: `${PI_REPO}/tree/main/packages/coding-agent/examples/extensions/with-deps`, isDirectory: true },
];

// ============================================================================
// Providers
// ============================================================================

export interface ProviderInfo {
  name: string;
  description: string;
  sourceFile: string;
  sourceLink: string;
  authMethod: string;
}

export const providers: ProviderInfo[] = [
  { name: "Anthropic", description: "Claude models via Messages API", sourceFile: "anthropic.ts", sourceLink: `${PI_REPO}/blob/main/packages/ai/src/providers/anthropic.ts`, authMethod: "ANTHROPIC_API_KEY" },
  { name: "OpenAI", description: "GPT and o-series via Responses API", sourceFile: "openai-responses.ts", sourceLink: `${PI_REPO}/blob/main/packages/ai/src/providers/openai-responses.ts`, authMethod: "OPENAI_API_KEY" },
  { name: "OpenAI (Completions)", description: "Legacy Chat Completions API", sourceFile: "openai-completions.ts", sourceLink: `${PI_REPO}/blob/main/packages/ai/src/providers/openai-completions.ts`, authMethod: "OPENAI_API_KEY" },
  { name: "Google Gemini", description: "Gemini models via Google AI Studio", sourceFile: "google.ts", sourceLink: `${PI_REPO}/blob/main/packages/ai/src/providers/google.ts`, authMethod: "GOOGLE_API_KEY" },
  { name: "Google Vertex AI", description: "Gemini via Vertex AI (GCP)", sourceFile: "google-vertex.ts", sourceLink: `${PI_REPO}/blob/main/packages/ai/src/providers/google-vertex.ts`, authMethod: "GCP credentials" },
  { name: "Azure OpenAI", description: "OpenAI models hosted on Azure", sourceFile: "azure-openai-responses.ts", sourceLink: `${PI_REPO}/blob/main/packages/ai/src/providers/azure-openai-responses.ts`, authMethod: "AZURE_OPENAI_API_KEY" },
  { name: "Amazon Bedrock", description: "Multi-model access via AWS Bedrock", sourceFile: "amazon-bedrock.ts", sourceLink: `${PI_REPO}/blob/main/packages/ai/src/providers/amazon-bedrock.ts`, authMethod: "AWS credentials" },
  { name: "Mistral", description: "Mistral AI models", sourceFile: "mistral.ts", sourceLink: `${PI_REPO}/blob/main/packages/ai/src/providers/mistral.ts`, authMethod: "MISTRAL_API_KEY" },
  { name: "Google Gemini CLI", description: "Gemini via CLI authentication", sourceFile: "google-gemini-cli.ts", sourceLink: `${PI_REPO}/blob/main/packages/ai/src/providers/google-gemini-cli.ts`, authMethod: "OAuth / gcloud" },
  { name: "OpenAI Codex", description: "Codex via Responses API", sourceFile: "openai-codex-responses.ts", sourceLink: `${PI_REPO}/blob/main/packages/ai/src/providers/openai-codex-responses.ts`, authMethod: "OPENAI_API_KEY" },
  { name: "GitHub Copilot", description: "Copilot-compatible endpoints", sourceFile: "github-copilot-headers.ts", sourceLink: `${PI_REPO}/blob/main/packages/ai/src/providers/github-copilot-headers.ts`, authMethod: "GitHub token" },
  { name: "Groq", description: "Fast inference via Groq hardware", sourceFile: "—", sourceLink: `${PI_REPO}/blob/main/packages/ai/src/providers/register-builtins.ts`, authMethod: "GROQ_API_KEY" },
  { name: "Cerebras", description: "Fast inference via Cerebras hardware", sourceFile: "—", sourceLink: `${PI_REPO}/blob/main/packages/ai/src/providers/register-builtins.ts`, authMethod: "CEREBRAS_API_KEY" },
  { name: "xAI", description: "Grok models via xAI API", sourceFile: "—", sourceLink: `${PI_REPO}/blob/main/packages/ai/src/providers/register-builtins.ts`, authMethod: "XAI_API_KEY" },
  { name: "OpenRouter", description: "Multi-provider routing", sourceFile: "—", sourceLink: `${PI_REPO}/blob/main/packages/ai/src/providers/register-builtins.ts`, authMethod: "OPENROUTER_API_KEY" },
  { name: "Ollama", description: "Local models via Ollama", sourceFile: "—", sourceLink: `${PI_REPO}/blob/main/packages/ai/src/providers/register-builtins.ts`, authMethod: "Local (no key)" },
];

// ============================================================================
// Keybindings
// ============================================================================

export interface KeybindingInfo {
  action: string;
  keys: string;
  description: string;
  category: string;
}

export const keybindings: KeybindingInfo[] = [
  // Core
  { action: "app.interrupt", keys: "Escape", description: "Cancel or abort current operation", category: "Core" },
  { action: "app.clear", keys: "Ctrl+C", description: "Clear editor", category: "Core" },
  { action: "app.exit", keys: "Ctrl+D", description: "Exit when editor is empty", category: "Core" },
  { action: "app.suspend", keys: "Ctrl+Z", description: "Suspend to background", category: "Core" },
  // Model & Thinking
  { action: "app.model.select", keys: "Ctrl+L", description: "Open model selector", category: "Model & Thinking" },
  { action: "app.model.cycleForward", keys: "Ctrl+P", description: "Cycle to next model", category: "Model & Thinking" },
  { action: "app.model.cycleBackward", keys: "Shift+Ctrl+P", description: "Cycle to previous model", category: "Model & Thinking" },
  { action: "app.thinking.cycle", keys: "Shift+Tab", description: "Cycle thinking level", category: "Model & Thinking" },
  { action: "app.thinking.toggle", keys: "Ctrl+T", description: "Toggle thinking blocks visibility", category: "Model & Thinking" },
  // Display
  { action: "app.tools.expand", keys: "Ctrl+O", description: "Toggle tool output expansion", category: "Display" },
  // Session
  { action: "app.session.new", keys: "Ctrl+Shift+N", description: "Start new session", category: "Session" },
  { action: "app.session.tree", keys: "Ctrl+Shift+T", description: "Open session tree navigator", category: "Session" },
  { action: "app.session.fork", keys: "Ctrl+Shift+F", description: "Fork from current point", category: "Session" },
  { action: "app.session.resume", keys: "Ctrl+Shift+R", description: "Resume a different session", category: "Session" },
  { action: "app.session.toggleNamedFilter", keys: "Ctrl+N", description: "Toggle named session filter", category: "Session" },
  // Editor
  { action: "app.editor.external", keys: "Ctrl+G", description: "Open external editor", category: "Editor" },
  { action: "app.clipboard.pasteImage", keys: "Ctrl+V", description: "Paste image from clipboard", category: "Editor" },
  // Messaging
  { action: "app.message.followUp", keys: "Alt+Enter", description: "Queue follow-up message", category: "Messaging" },
  { action: "app.message.dequeue", keys: "Ctrl+Shift+D", description: "Remove queued message", category: "Messaging" },
];

// ============================================================================
// Extension API Surface
// ============================================================================

export interface ApiSurface {
  category: string;
  methods: { name: string; description: string }[];
}

export const extensionApi: ApiSurface[] = [
  {
    category: "UI Primitives",
    methods: [
      { name: "ui.select()", description: "Show a selector and return the user's choice" },
      { name: "ui.confirm()", description: "Show a confirmation dialog" },
      { name: "ui.input()", description: "Show a text input dialog" },
      { name: "ui.notify()", description: "Show a notification" },
      { name: "ui.editor()", description: "Open a multi-line editor" },
      { name: "ui.custom()", description: "Show a custom component with keyboard focus" },
      { name: "ui.setWidget()", description: "Set a widget above or below the editor" },
      { name: "ui.setHeader()", description: "Replace the startup header" },
      { name: "ui.setFooter()", description: "Replace the footer/status bar" },
      { name: "ui.setEditorComponent()", description: "Replace the input editor (vim mode, etc.)" },
      { name: "ui.setStatus()", description: "Set status text in the footer" },
      { name: "ui.setTitle()", description: "Set the terminal window title" },
      { name: "ui.setTheme()", description: "Switch the active theme" },
    ],
  },
  {
    category: "Lifecycle Events",
    methods: [
      { name: "onSessionStart", description: "Fires when a session begins" },
      { name: "onSessionShutdown", description: "Fires when pi is exiting" },
      { name: "beforeTurn", description: "Before each agent turn (inject context, gate)" },
      { name: "afterTurn", description: "After each agent turn completes" },
      { name: "beforeToolCall", description: "Before tool execution (can block)" },
      { name: "afterToolCall", description: "After tool execution (can modify result)" },
      { name: "onMessage", description: "On each message (start, update, end)" },
      { name: "beforeCompaction", description: "Before context compaction" },
      { name: "transformContext", description: "Filter/rewrite message history for the LLM" },
    ],
  },
  {
    category: "Registration",
    methods: [
      { name: "registerTool()", description: "Add an LLM-callable tool with schema and renderer" },
      { name: "registerCommand()", description: "Add a slash command" },
      { name: "registerKeybinding()", description: "Add a keyboard shortcut" },
      { name: "registerDynamicResource()", description: "Inject context each turn" },
      { name: "registerToolRenderer()", description: "Custom rendering for any tool" },
      { name: "registerErrorListener()", description: "Handle extension errors" },
    ],
  },
  {
    category: "Session Control",
    methods: [
      { name: "ctx.abort()", description: "Abort the current agent operation" },
      { name: "ctx.compact()", description: "Trigger context compaction" },
      { name: "ctx.shutdown()", description: "Gracefully shutdown pi" },
      { name: "ctx.getContextUsage()", description: "Get current context window usage" },
      { name: "ctx.getSystemPrompt()", description: "Read the effective system prompt" },
      { name: "ctx.isIdle()", description: "Whether the agent is idle" },
    ],
  },
];
