import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Filter } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  uploader: string;
  uploadDate: string;
  size: string;
  icon: string;
}

export function DocsSection() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Project Requirements.pdf",
      type: "pdf",
      uploader: "Sarah Johnson",
      uploadDate: "2024-01-10",
      size: "2.3 MB",
      icon: "📄"
    },
    {
      id: "2",
      name: "UI Design Mockups.fig",
      type: "design",
      uploader: "Alex Chen",
      uploadDate: "2024-01-12",
      size: "15.7 MB",
      icon: "🎨"
    },
    {
      id: "3",
      name: "API Documentation.docx",
      type: "document",
      uploader: "Mike Brown",
      uploadDate: "2024-01-14",
      size: "1.8 MB",
      icon: "📝"
    },
    {
      id: "4",
      name: "Database Schema.sql",
      type: "code",
      uploader: "Sarah Johnson",
      uploadDate: "2024-01-15",
      size: "0.5 MB",
      icon: "💻"
    },
    {
      id: "5",
      name: "User Testing Results.xlsx",
      type: "data",
      uploader: "Alex Chen",
      uploadDate: "2024-01-16",
      size: "3.2 MB",
      icon: "📊"
    },
    {
      id: "6",
      name: "Presentation Slides.pptx",
      type: "presentation",
      uploader: "Mike Brown",
      uploadDate: "2024-01-17",
      size: "8.1 MB",
      icon: "📊"
    }
  ]);

  const filters = [
    { key: "all", label: "All Files" },
    { key: "pdf", label: "PDFs" },
    { key: "design", label: "Design Files" },
    { key: "document", label: "Documents" },
    { key: "code", label: "Code Files" },
    { key: "data", label: "Data Files" },
    { key: "presentation", label: "Presentations" }
  ];

  const filteredDocuments = activeFilter === "all" 
    ? documents 
    : documents.filter(doc => doc.type === activeFilter);

  const handleFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        Array.from(target.files).forEach(file => {
          const newDoc: Document = {
            id: Date.now().toString() + Math.random(),
            name: file.name,
            type: getFileType(file.name),
            uploader: "You",
            uploadDate: new Date().toISOString().split('T')[0],
            size: formatFileSize(file.size),
            icon: getFileIcon(file.name)
          };
          setDocuments(prev => [newDoc, ...prev]);
        });
      }
    };
    input.click();
  };

  const getFileType = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (['pdf'].includes(ext || '')) return 'pdf';
    if (['fig', 'sketch', 'ai', 'psd'].includes(ext || '')) return 'design';
    if (['doc', 'docx'].includes(ext || '')) return 'document';
    if (['js', 'ts', 'jsx', 'tsx', 'py', 'java', 'cpp', 'sql'].includes(ext || '')) return 'code';
    if (['xlsx', 'csv', 'json'].includes(ext || '')) return 'data';
    if (['ppt', 'pptx'].includes(ext || '')) return 'presentation';
    return 'document';
  };

  const getFileIcon = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (['pdf'].includes(ext || '')) return '📄';
    if (['fig', 'sketch', 'ai', 'psd'].includes(ext || '')) return '🎨';
    if (['doc', 'docx'].includes(ext || '')) return '📝';
    if (['js', 'ts', 'jsx', 'tsx', 'py', 'java', 'cpp', 'sql'].includes(ext || '')) return '💻';
    if (['xlsx', 'csv', 'json'].includes(ext || '')) return '📊';
    if (['ppt', 'pptx'].includes(ext || '')) return '📊';
    return '📄';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="docs-container p-5 h-full flex flex-col">
      {/* Header */}
      <div className="docs-header flex justify-between items-center mb-4">
        <h3 className="section-title text-base font-semibold text-gray-900">Documents</h3>
        <Button
          onClick={handleFileUpload}
          className="submit-work-btn bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
        >
          <Upload className="w-4 h-4 mr-2" />
          Submit Work
        </Button>
      </div>

      {/* Filter Tags */}
      <div className="filter-tags flex gap-2 mb-4 flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`filter-tag px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
              activeFilter === filter.key
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Files Grid */}
      <div className="files-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 overflow-y-auto flex-1">
        {filteredDocuments.map((doc) => (
          <div
            key={doc.id}
            className="file-item bg-white border border-gray-200 rounded-lg p-3 text-center cursor-pointer hover:border-blue-500 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
          >
            <div className="file-icon w-8 h-8 mx-auto mb-2 text-2xl">
              {doc.icon}
            </div>
            <div className="file-name text-xs font-medium text-gray-900 mb-1 truncate" title={doc.name}>
              {doc.name}
            </div>
            <div className="file-uploader text-xs text-gray-500">
              by {doc.uploader}
            </div>
            <div className="file-meta text-xs text-gray-400 mt-1">
              {doc.size} • {doc.uploadDate}
            </div>
          </div>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center">
            <FileText className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No files found</p>
          </div>
        </div>
      )}
    </div>
  );
}
