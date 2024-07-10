import { motion, AnimatePresence } from "framer-motion";
import { IconRider } from "../../../icons/IconRider";
import CommonButton from "../../../components/CommonButton";

const ModalChatNotification = ({
  onClose,
  isOpen,
  riderName,
  riderProfilePic,
  message,
  openChat
}) => {
  // ฟังก์ชันสำหรับปิดโมดอล
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };


  // ฟังก์ชันสำหรับการนำทางไปที่ Google
  const handleReply = () => {
    onClose();
    openChat()
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 flex flex-col items-center justify-center "></div>
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }} // ปรับระยะเวลาในการปิด
          >
            <motion.div
              className="p-4 rounded-2xl bg-gradient-to-r from-[#516293] from-0% to-[#1D2B53] to-100% border-[4px] min-w-full m-16 flex flex-col items-center min-h-[400px] justify-between text-white"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8, transition: { duration: 0.2 } }} // ปรับระยะเวลาในการปิด
            >
              <div className=" flex w-full items-center">
                {riderProfilePic ? (
                  <img
                    src={riderProfilePic}
                    alt={riderName}
                    className="border-[3px] border-torchRed rounded-[14px] min-h-[80px] min-w-[80px] max-h-[80px] max-w-[80px] object-cover"
                  />
                ) : (
                  <div className="border-[3px] border-torchRed rounded-[14px] min-h-[80px] min-w-[80px] max-h-[80px] max-w-[80px] flex items-center justify-center">
                    <IconRider width="riderCall" />
                  </div>
                )}
                <div className="w-full text-right p-2">{riderName}</div>
              </div>
              <div className="bg-white rounded-2xl w-[90%] h-[60px] text-black flex items-center justify-center">
                <div className="m-2 flex items-center h-full w-full space-x-2 overflow-hidden">
                  <div>rider:</div>
                  <div className="truncate">{message}</div>
                </div>
              </div>
              <div className="flex justify-around w-full">
                <CommonButton onClick={handleClose}>Close</CommonButton>
                <CommonButton
                  bg="white"
                  text="torchRed"
                  width="reply"
                  height="reply"
                  borderColor="white"
                  borderWidth="common"
                  fontSize="reply"
                  onClick={handleReply}
                >
                  Reply
                </CommonButton>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalChatNotification;
