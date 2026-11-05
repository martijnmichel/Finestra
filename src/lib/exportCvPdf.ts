import { jsPDF } from "jspdf";

export type CvProject = {
  title: string;
  desc: string;
  frameworks?: string[];
};

export type CvPayload = {
  name: string;
  subtitle: string;
  about: string;
  tagline: string;
  email: string;
  linkedIn: string;
  projects: CvProject[];
};

export function exportCvPdf(payload: CvPayload) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const margin = 48;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxWidth = pageWidth - margin * 2;
  let y = margin;

  const ensureSpace = (needed: number) => {
    if (y + needed > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      y = margin;
    }
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(payload.name, margin, y);
  y += 24;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(80);
  doc.text(payload.subtitle, margin, y);
  y += 16;
  doc.text(payload.tagline, margin, y);
  y += 14;
  doc.text(`${payload.email}  ·  ${payload.linkedIn}`, margin, y);
  y += 28;

  doc.setTextColor(20);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("About", margin, y);
  y += 16;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const aboutLines = doc.splitTextToSize(payload.about, maxWidth);
  ensureSpace(aboutLines.length * 13 + 20);
  doc.text(aboutLines, margin, y);
  y += aboutLines.length * 13 + 22;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Selected projects", margin, y);
  y += 18;

  for (const project of payload.projects) {
    ensureSpace(56);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(20);
    doc.text(project.title, margin, y);
    y += 14;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(60);
    const descLines = doc.splitTextToSize(project.desc, maxWidth);
    doc.text(descLines, margin, y);
    y += descLines.length * 12 + 4;
    if (project.frameworks?.length) {
      doc.setFontSize(9);
      doc.setTextColor(100);
      const stack = doc.splitTextToSize(
        project.frameworks.join(" · "),
        maxWidth
      );
      doc.text(stack, margin, y);
      y += stack.length * 11 + 12;
    } else {
      y += 10;
    }
  }

  doc.save("Martijn-van-der-Eijk-CV.pdf");
}
