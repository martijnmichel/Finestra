import cvUrl from "../../profile/cv/CV_English.pdf?url";

const CV_FILENAME = "Martijn-van-der-Eijk-CV.pdf";

export function exportCvPdf() {
  const link = document.createElement("a");
  link.href = cvUrl;
  link.download = CV_FILENAME;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}
