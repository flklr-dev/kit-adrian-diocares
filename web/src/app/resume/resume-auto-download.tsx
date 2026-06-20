"use client";

import { useEffect } from "react";

const RESUME_PATH = "/kit-resume-2.pdf";
const RESUME_FILENAME = "Kit-Adrian-Diocares-Resume.pdf";

export function ResumeAutoDownload() {
  useEffect(() => {
    const link = document.createElement("a");
    link.href = RESUME_PATH;
    link.download = RESUME_FILENAME;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return null;
}
