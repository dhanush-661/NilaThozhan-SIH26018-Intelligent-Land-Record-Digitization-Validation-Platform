import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, Trash2, X, Check } from 'lucide-react';
import { LandDocument } from '../../types';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: LandDocument | null;
  onSuccess?: () => void;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  document: doc,
  onSuccess,
}) => {
  const { deleteDocument, currentLanguage } = useApp();
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !doc) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteDocument(doc.id);
      setIsDeleting(false);
      onClose();
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Delete failed:', err);
      setIsDeleting(false);
      onClose();
    }
  };

  const texts = {
    ta: {
      title: 'நில ஆவணத்தை நிரந்தரமாக நீக்கவா?',
      badge: 'கவனத்திற்குரிய செயல்முறை',
      warning:
        'இந்த ஆவணம், அதன் OCR உரை, GIS வரைபட இணைப்புகள் மற்றும் தணிக்கைப் பதிவுகள் அனைத்தும் நிரந்தரமாக நீக்கப்படும். இந்த செயலை மீட்டமைக்க முடியாது.',
      docNo: 'ஆவண எண்:',
      surveyNo: 'சர்வே எண்:',
      owner: 'உரிமையாளர்:',
      cancel: 'ரத்து செய்',
      confirm: 'நிரந்தரமாக நீக்கு',
      deleting: 'நீக்கப்படுகிறது...',
    },
    en: {
      title: 'Permanently Delete Land Record?',
      badge: 'Irreversible Action',
      warning:
        'This land record, along with its extracted optical fields, GIS spatial cadastre links, and cryptographic audit events will be permanently removed. This action cannot be reversed.',
      docNo: 'Document No:',
      surveyNo: 'Survey No:',
      owner: 'Landholder:',
      cancel: 'Cancel',
      confirm: 'Confirm & Delete Record',
      deleting: 'Deleting Record...',
    },
    hi: {
      title: 'क्या आप इस भू-अभिलेख को स्थायी रूप से हटाना चाहते हैं?',
      badge: 'अपरिवर्तनीय कार्रवाई',
      warning:
        'यह भू-अभिलेख, इसके निकाले गए ऑप्टिकल विवरण, जीआईएस मानचित्र संबंध और ऑडिट रिकॉर्ड स्थायी रूप से हटा दिए जाएंगे। इस कार्रवाई को पूर्ववत नहीं किया जा सकता।',
      docNo: 'विलेख सं:',
      surveyNo: 'सर्वेक्षण सं:',
      owner: 'भूमि स्वामी:',
      cancel: 'रद्द करें',
      confirm: 'रिकॉर्ड हटाएं',
      deleting: 'हटाया जा रहा है...',
    },
  }[currentLanguage] || {
    title: 'Permanently Delete Land Record?',
    badge: 'Irreversible Action',
    warning:
      'This land record, along with its extracted optical fields, GIS spatial cadastre links, and cryptographic audit events will be permanently removed.',
    docNo: 'Document No:',
    surveyNo: 'Survey No:',
    owner: 'Landholder:',
    cancel: 'Cancel',
    confirm: 'Confirm & Delete Record',
    deleting: 'Deleting Record...',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-rose-200 animate-in zoom-in-95">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-rose-100 bg-rose-50/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-800 bg-rose-100 px-2 py-0.5 rounded">
                {texts.badge}
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                {texts.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 text-xs">
          {/* Target Record Summary Card */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-[11px]">{texts.docNo}</span>
              <span className="font-mono font-bold text-slate-900">{doc.documentNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-[11px]">{texts.surveyNo}</span>
              <span className="font-mono font-bold text-emerald-800">{doc.surveyNumber}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-[11px]">{texts.owner}</span>
              <span className="font-semibold text-slate-800 truncate max-w-[180px]">{doc.ownerName}</span>
            </div>
          </div>

          {/* Warning Notice */}
          <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 text-rose-800 text-[11px] leading-relaxed">
            {texts.warning}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              {texts.cancel}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-900/20 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isDeleting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{texts.deleting}</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{texts.confirm}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
