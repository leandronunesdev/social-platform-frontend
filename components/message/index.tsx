type MessageType = "error" | "info";

type MessageProps = {
  message: string;
  type?: MessageType;
};

const Message = ({ message, type = "info" }: MessageProps) => {
  const baseClasses = {
    container: "mb-4 p-3 border rounded-lg",
    text: "text-sm whitespace-pre-line",
  };
  const errorClasses = {
    container: "bg-red-50 border-red-200",
    text: "text-red-600",
  };
  const infoClasses = {
    container: "bg-primary-50 border-primary-800",
    text: "text-primary-800",
  };

  const typeClasses = type === "error" ? errorClasses : infoClasses;

  return (
    <div className={`${baseClasses.container} ${typeClasses.container}`}>
      <p className={`${baseClasses.text} ${typeClasses.text}`}>{message}</p>
    </div>
  );
};

export default Message;
