import React, { useState, useEffect } from 'react';
import { PROMPT_TEMPLATES } from '../data/navData';
import {
  X,
  Code2,
  Sparkles,
  FileJson,
  Binary,
  Copy,
  RotateCcw,
  Clock,
  ArrowRightLeft,
} from 'lucide-react';

interface DevToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

type TabType = 'prompt' | 'json' | 'transform';

export const DevToolsModal: React.FC<DevToolsModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('prompt');

  // Prompt state
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);
  const [promptContent, setPromptContent] = useState(
    PROMPT_TEMPLATES[0].prompt
  );

  // JSON state
  const [jsonInput, setJsonInput] = useState(
    '{\n  "status": "success",\n  "code": 200,\n  "data": {\n    "message": "Hello DevAI Hub",\n    "tools": ["DeepSeek", "Cursor", "Claude"]\n  }\n}'
  );
  const [jsonError, setJsonError] = useState<string | null>(null);

  // Transform state
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(
    Math.floor(Date.now() / 1000)
  );
  const [inputTimestamp, setInputTimestamp] = useState<string>(
    Math.floor(Date.now() / 1000).toString()
  );
  const [convertedDate, setConvertedDate] = useState<string>('');
  const [inputDate, setInputDate] = useState<string>('');
  const [convertedTimestamp, setConvertedTimestamp] = useState<string>('');

  const [encodeInput, setEncodeInput] = useState<string>('Hello AI & Developers!');
  const [encodeOutput, setEncodeOutput] = useState<string>('');

  // Clock timer
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  // JSON format actions
  const formatJson = (spaces = 2) => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed, null, spaces));
      setJsonError(null);
      onShowToast('JSON 格式化成功', 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setJsonError(msg);
      onShowToast('JSON 格式有误: ' + msg, 'error');
    }
  };

  const compressJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonInput(JSON.stringify(parsed));
      setJsonError(null);
      onShowToast('JSON 已压缩为单行', 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setJsonError(msg);
      onShowToast('JSON 格式有误: ' + msg, 'error');
    }
  };

  const copyToClipboard = (text: string, label = '内容已复制') => {
    navigator.clipboard.writeText(text);
    onShowToast(label, 'success');
  };

  // Timestamp converter
  const handleConvertTimestampToDate = () => {
    const ts = parseInt(inputTimestamp, 10);
    if (isNaN(ts)) {
      onShowToast('请输入有效的时间戳数值', 'error');
      return;
    }
    const ms = ts.toString().length === 10 ? ts * 1000 : ts;
    const date = new Date(ms);
    setConvertedDate(date.toLocaleString('zh-CN', { hour12: false }));
  };

  const handleConvertDateToTimestamp = () => {
    const ts = Date.parse(inputDate);
    if (isNaN(ts)) {
      onShowToast('请输入标准日期格式 (如 2026-05-20 12:00:00)', 'error');
      return;
    }
    setConvertedTimestamp(Math.floor(ts / 1000).toString());
  };

  // Base64 & URL
  const handleBase64Encode = () => {
    try {
      setEncodeOutput(btoa(unescape(encodeURIComponent(encodeInput))));
      onShowToast('Base64 编码完成', 'success');
    } catch {
      onShowToast('Base64 编码失败', 'error');
    }
  };

  const handleBase64Decode = () => {
    try {
      setEncodeOutput(decodeURIComponent(escape(atob(encodeInput))));
      onShowToast('Base64 解码完成', 'success');
    } catch {
      onShowToast('无效的 Base64 字符串', 'error');
    }
  };

  const handleUrlEncode = () => {
    setEncodeOutput(encodeURIComponent(encodeInput));
    onShowToast('URL 编码完成', 'success');
  };

  const handleUrlDecode = () => {
    try {
      setEncodeOutput(decodeURIComponent(encodeInput));
      onShowToast('URL 解码完成', 'success');
    } catch {
      onShowToast('URL 解码异常', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh] z-10 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-slate-100 text-base">
                内置开发小工具箱
              </h2>
              <p className="text-xs text-slate-400">
                纯前端离线运行，数据绝不上报，保护代码与数据隐私
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-3 border-b border-slate-200 dark:border-slate-800 flex gap-2">
          <button
            onClick={() => setActiveTab('prompt')}
            className={`flex items-center gap-2 pb-3 px-3 text-xs font-medium border-b-2 transition-all ${
              activeTab === 'prompt'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>AI Prompt 提示词模板库</span>
          </button>

          <button
            onClick={() => setActiveTab('json')}
            className={`flex items-center gap-2 pb-3 px-3 text-xs font-medium border-b-2 transition-all ${
              activeTab === 'json'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <FileJson className="w-4 h-4" />
            <span>JSON 格式化 & 校验</span>
          </button>

          <button
            onClick={() => setActiveTab('transform')}
            className={`flex items-center gap-2 pb-3 px-3 text-xs font-medium border-b-2 transition-all ${
              activeTab === 'transform'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Binary className="w-4 h-4" />
            <span>时间戳 & 编解码工具</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* TAB 1: PROMPT TEMPLATES */}
          {activeTab === 'prompt' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Left templates list */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  精选高质量系统 Prompt
                </span>
                {PROMPT_TEMPLATES.map((tmpl, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedPromptIndex(idx);
                      setPromptContent(tmpl.prompt);
                    }}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                      selectedPromptIndex === idx
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700 text-indigo-900 dark:text-indigo-200 font-medium shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200/60 dark:bg-slate-700/60 text-slate-600 dark:text-slate-400 font-normal mr-1.5">
                      {tmpl.category}
                    </span>
                    <p className="mt-1 font-semibold">{tmpl.title}</p>
                  </button>
                ))}
              </div>

              {/* Right editor */}
              <div className="md:col-span-2 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    模板内容编辑与一键复制
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setPromptContent(PROMPT_TEMPLATES[selectedPromptIndex].prompt)
                      }
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>重置</span>
                    </button>
                    <button
                      onClick={() => copyToClipboard(promptContent, '提示词已成功复制到剪贴板！')}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium shadow-xs transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>一键复制 Prompt</span>
                    </button>
                  </div>
                </div>

                <textarea
                  value={promptContent}
                  onChange={(e) => setPromptContent(e.target.value)}
                  rows={14}
                  className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500 leading-relaxed resize-none"
                />
              </div>
            </div>
          )}

          {/* TAB 2: JSON FORMATTER */}
          {activeTab === 'json' && (
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => formatJson(2)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium shadow-xs transition-colors"
                  >
                    格式化 (2 空格)
                  </button>
                  <button
                    onClick={() => formatJson(4)}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors"
                  >
                    格式化 (4 空格)
                  </button>
                  <button
                    onClick={compressJson}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors"
                  >
                    压缩为单行
                  </button>
                  <button
                    onClick={() => {
                      setJsonInput('');
                      setJsonError(null);
                    }}
                    className="px-3 py-1.5 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-medium transition-colors"
                  >
                    清空
                  </button>
                </div>

                <button
                  onClick={() => copyToClipboard(jsonInput, 'JSON 代码已复制')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-medium transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>复制结果</span>
                </button>
              </div>

              {jsonError && (
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs">
                  ❌ 语法解析错误: {jsonError}
                </div>
              )}

              <textarea
                value={jsonInput}
                onChange={(e) => {
                  setJsonInput(e.target.value);
                  setJsonError(null);
                }}
                rows={15}
                placeholder="在此粘贴或输入 JSON 数据..."
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>
          )}

          {/* TAB 3: TRANSFORM TOOLS */}
          {activeTab === 'transform' && (
            <div className="space-y-6">
              {/* Timestamp Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-indigo-500" />
                    <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                      Unix 时间戳互转
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400">当前时间戳 (秒):</span>
                    <code className="font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded">
                      {currentTimestamp}
                    </code>
                    <button
                      onClick={() =>
                        copyToClipboard(currentTimestamp.toString(), '当前时间戳已复制')
                      }
                      className="p-1 hover:text-indigo-600"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Timestamp to Date */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-medium text-slate-500">
                      时间戳 (秒或毫秒) 转换为本地时间:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputTimestamp}
                        onChange={(e) => setInputTimestamp(e.target.value)}
                        placeholder="例如: 1776999999"
                        className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono"
                      />
                      <button
                        onClick={handleConvertTimestampToDate}
                        className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium"
                      >
                        转换
                      </button>
                    </div>
                    {convertedDate && (
                      <div className="mt-1 p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium flex items-center justify-between">
                        <span>{convertedDate}</span>
                        <button
                          onClick={() => copyToClipboard(convertedDate)}
                          className="hover:underline text-[11px]"
                        >
                          复制
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Date to Timestamp */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-medium text-slate-500">
                      北京时间 / 日期 转换为时间戳:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputDate}
                        onChange={(e) => setInputDate(e.target.value)}
                        placeholder="例如: 2026-05-20 12:00:00"
                        className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono"
                      />
                      <button
                        onClick={handleConvertDateToTimestamp}
                        className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium"
                      >
                        转换
                      </button>
                    </div>
                    {convertedTimestamp && (
                      <div className="mt-1 p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium flex items-center justify-between">
                        <span>{convertedTimestamp}</span>
                        <button
                          onClick={() => copyToClipboard(convertedTimestamp)}
                          className="hover:underline text-[11px]"
                        >
                          复制
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Base64 & URL Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80">
                <div className="flex items-center gap-2 mb-3">
                  <ArrowRightLeft className="w-4 h-4 text-purple-500" />
                  <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                    Base64 与 URL 编解码
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-medium text-slate-500 block mb-1.5">
                      输入原文或密文:
                    </label>
                    <textarea
                      value={encodeInput}
                      onChange={(e) => setEncodeInput(e.target.value)}
                      rows={5}
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono"
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      <button
                        onClick={handleBase64Encode}
                        className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium"
                      >
                        Base64 编码
                      </button>
                      <button
                        onClick={handleBase64Decode}
                        className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium hover:bg-slate-300"
                      >
                        Base64 解码
                      </button>
                      <button
                        onClick={handleUrlEncode}
                        className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium"
                      >
                        URL 编码
                      </button>
                      <button
                        onClick={handleUrlDecode}
                        className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium hover:bg-slate-300"
                      >
                        URL 解码
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[11px] font-medium text-slate-500">
                        转换输出结果:
                      </label>
                      {encodeOutput && (
                        <button
                          onClick={() => copyToClipboard(encodeOutput)}
                          className="text-[11px] text-indigo-600 hover:underline flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          <span>复制结果</span>
                        </button>
                      )}
                    </div>
                    <textarea
                      readOnly
                      value={encodeOutput}
                      rows={5}
                      placeholder="转换结果将在此呈现..."
                      className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/50 text-xs font-mono text-slate-700 dark:text-slate-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
