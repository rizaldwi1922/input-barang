import RenderIf from "../RenderIf";

const Modal = (props) => {
    const { children, show, onClose, onSave, title } = props;
    return (
        <RenderIf condition={show}>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                <div className="relative w-auto mx-auto my-6">
                    {/*content*/}
                    <div
                        style={{ backgroundColor: "#344C64" }}
                        className="relative flex flex-col w-full border-0 rounded-lg shadow-lg outline-none focus:outline-none"
                    >
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                            <h3 className="text-3xl font-semibold text-black dark:text-white">
                                {title}
                            </h3>
                            <button
                                className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                                onClick={onClose}
                            >
                                <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative flex-auto p-6">
                            {/* <p className="my-4 text-lg leading-relaxed text-black dark:text-white">
                                I always felt like I could do anything. That’s
                                the main thing people are controlled by!
                                Thoughts- their perception of themselves!
                                They're slowed down by their perception of
                                themselves. If you're taught you can’t do
                                anything, you won’t do anything. I was taught I
                                could do everything.
                            </p> */}
                            <div style={{ width: 800 }}>{children}</div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-blueGray-200">
                            <button
                                className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                                type="button"
                                onClick={onClose}
                            >
                                Close
                            </button>
                            <button
                                className="px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear rounded shadow outline-none bg-emerald-500 active:bg-emerald-600 hover:shadow-lg focus:outline-none"
                                type="button"
                                onClick={onSave}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </RenderIf>
    );
};

export default Modal;