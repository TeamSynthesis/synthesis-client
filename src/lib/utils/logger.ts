type LogLevel = "ERROR" | "INFO" | "DEBUG";

const logger = (logLevel: LogLevel, message: string, e: any) => {
  console.log(`[${logLevel}] ${message} ${e?.message}`);
};

export default logger;
