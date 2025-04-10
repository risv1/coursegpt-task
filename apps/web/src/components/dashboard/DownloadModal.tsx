import { BsFiletypeDocx } from "react-icons/bs";
import { FaFilePowerpoint } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

type DownloadModalProps = {
  isOpen: boolean;
  onClose: () => void;
}

const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownload = (format: string) => {
    console.log(`Downloading in ${format} format`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Export Lesson Materials
          </h3>
          <button
            onClick={onClose}
            className="hover:cursor-pointer text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 h-8 w-8 rounded-full flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-700"
          >
            <IoIosClose size={24} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-6">
            Choose how you want to use your lesson content:
          </p>

          <div className="space-y-4">
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 mr-4">
                    <FaFilePowerpoint size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
                      Presentation Slides
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Ready-to-use PowerPoint slides for classroom teaching
                    </p>
                  </div>
                </div>

                <div className="pl-16 mt-4">
                  <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2"></span>
                      Instructor notes included
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2"></span>
                      Visual diagrams and figures
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2"></span>
                      Key points highlighted
                    </li>
                  </ul>
                </div>
              </div>

              <div className="px-5 py-3 bg-neutral-50 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
                <button
                  onClick={() => handleDownload('pptx')}
                  className="hover:cursor-pointer w-full py-2 text-center bg-red-400 hover:bg-red-500 text-black font-medium rounded-full transition-colors focus:ring-2 focus:ring-red-400 focus:ring-offset-2 dark:focus:ring-offset-neutral-800"
                >
                  Download PowerPoint (.pptx)
                </button>
              </div>
            </div>
            <div className="border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 mr-4">
                    <BsFiletypeDocx size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
                      Document Format
                    </h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Detailed Word document for handouts and curriculum plans
                    </p>
                  </div>
                </div>

                <div className="pl-16 mt-4">
                  <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2"></span>
                      Comprehensive content with exercises
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2"></span>
                      Structured formatting with headings
                    </li>
                    <li className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 mr-2"></span>
                      Ready for printing or digital distribution
                    </li>
                  </ul>
                </div>
              </div>

              <div className="px-5 py-3 bg-neutral-50 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
                <button
                  onClick={() => handleDownload('docx')}
                  className="hover:cursor-pointer w-full py-2 text-center bg-red-400 hover:bg-red-500 text-black font-medium rounded-full transition-colors focus:ring-2 focus:ring-red-400 focus:ring-offset-2 dark:focus:ring-offset-neutral-800"
                >
                  Download Word Document (.docx)
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-neutral-200 dark:border-neutral-700 flex justify-end">
          <button
            onClick={onClose}
            className="hover:cursor-pointer px-5 py-2.5 border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full text-neutral-700 dark:text-neutral-300 font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
