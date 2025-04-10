/* eslint-disable @typescript-eslint/no-explicit-any */
import PptxGenJS from "pptxgenjs";

export const generatePowerPoint = (courseData: any) => {
  if (!courseData) {
    console.error("No course data available");
    return;
  }

  const pres = new PptxGenJS();

  pres.layout = "LAYOUT_16x9";
  pres.defineSlideMaster({
    title: "MASTER_SLIDE",
    background: { color: "FFFFFF" },
    objects: [
      { rect: { x: 0, y: 0, w: "100%", h: 0.5, fill: { color: "F5F5F5" } } },
    ],
  });

  let slide = pres.addSlide({ masterName: "MASTER_SLIDE" });
  slide.addText(courseData.title, {
    x: 0.5,
    y: 1,
    w: "90%",
    fontSize: 36,
    bold: true,
    color: "363636",
  });
  slide.addText(`Duration: ${courseData.totalDuration} minutes`, {
    x: 0.5,
    y: 2.5,
    w: "90%",
    fontSize: 18,
    color: "666666",
  });
  slide.addText(`Target Audience: ${courseData.targetAudience}`, {
    x: 0.5,
    y: 3,
    w: "90%",
    fontSize: 18,
    color: "666666",
  });

  slide = pres.addSlide({ masterName: "MASTER_SLIDE" });
  slide.addText("Course Overview", {
    x: 0.5,
    y: 0.5,
    w: "90%",
    fontSize: 28,
    bold: true,
    color: "363636",
  });
  slide.addText(courseData.description, {
    x: 0.5,
    y: 1.5,
    w: "90%",
    h: 3,
    fontSize: 14,
    color: "666666",
  });

  slide = pres.addSlide({ masterName: "MASTER_SLIDE" });
  slide.addText("Course Modules", {
    x: 0.5,
    y: 0.5,
    w: "90%",
    fontSize: 28,
    bold: true,
    color: "363636",
  });

  let moduleText = "";
  courseData.modules.forEach((module: any, index: number) => {
    moduleText += `${index + 1}. ${module.title}\n`;
  });

  slide.addText(moduleText, {
    x: 0.5,
    y: 1.5,
    w: "90%",
    fontSize: 16,
    color: "666666",
    bullet: { type: "number" },
  });

  slide = pres.addSlide({ masterName: "MASTER_SLIDE" });
  slide.addText("Learning Outcomes", {
    x: 0.5,
    y: 0.5,
    w: "90%",
    fontSize: 28,
    bold: true,
    color: "363636",
  });

  let outcomesText = "";
  courseData.learningOutcomes.forEach((outcome: string) => {
    outcomesText += `• ${outcome}\n`;
  });

  slide.addText(outcomesText, {
    x: 0.5,
    y: 1.5,
    w: "90%",
    fontSize: 16,
    color: "666666",
    bullet: { type: "bullet" },
  });

  courseData.modules.forEach((module: any) => {
    slide = pres.addSlide({ masterName: "MASTER_SLIDE" });
    slide.addText(module.title, {
      x: 0.5,
      y: 0.5,
      w: "90%",
      fontSize: 28,
      bold: true,
      color: "363636",
    });
    slide.addText(module.description, {
      x: 0.5,
      y: 1.5,
      w: "90%",
      fontSize: 14,
      color: "666666",
    });
    slide.addText(`Duration: ${module.duration}`, {
      x: 0.5,
      y: 4.5,
      w: "90%",
      fontSize: 14,
      bold: true,
      color: "666666",
    });

    slide = pres.addSlide({ masterName: "MASTER_SLIDE" });
    slide.addText(`${module.title} - Subtopics`, {
      x: 0.5,
      y: 0.5,
      w: "90%",
      fontSize: 28,
      bold: true,
      color: "363636",
    });

    let subtopicsText = "";
    module.subtopics.forEach((subtopic: string) => {
      subtopicsText += `• ${subtopic}\n`;
    });

    slide.addText(subtopicsText, {
      x: 0.5,
      y: 1.5,
      w: "90%",
      fontSize: 16,
      color: "666666",
      bullet: { type: "bullet" },
    });

    slide = pres.addSlide({ masterName: "MASTER_SLIDE" });
    slide.addText(`${module.title} - Resources`, {
      x: 0.5,
      y: 0.5,
      w: "90%",
      fontSize: 28,
      bold: true,
      color: "363636",
    });

    if (module.images && module.images.length > 0) {
      slide.addText("Image References:", {
        x: 0.5,
        y: 1.5,
        w: "90%",
        fontSize: 14,
        bold: true,
        color: "666666",
      });

      let imagesText = "";
      module.images.forEach((image: any) => {
        imagesText += `• ${image.title}\n`;
      });

      slide.addText(imagesText, {
        x: 0.5,
        y: 2.0,
        w: "90%",
        fontSize: 12,
        color: "666666",
        bullet: { type: "bullet" },
      });
    }

    if (module.externalLinks && module.externalLinks.length > 0) {
      let linksText = "External Resources:\n";
      module.externalLinks.forEach((link: any) => {
        linksText += `• ${link.title}\n`;
      });

      slide.addText(linksText, {
        x: 0.5,
        y: 3.5,
        w: "90%",
        fontSize: 12,
        color: "666666",
        bullet: { type: "bullet" },
      });
    }

    if (module.quiz && module.quiz.length > 0) {
      const questionsPerSlide = 1;
      const quizGroups = [];

      for (let i = 0; i < module.quiz.length; i += questionsPerSlide) {
        quizGroups.push(module.quiz.slice(i, i + questionsPerSlide));
      }

      quizGroups.forEach((questionGroup, groupIndex) => {
        slide = pres.addSlide({ masterName: "MASTER_SLIDE" });
        slide.addText(`${module.title} - Quiz Questions (${groupIndex + 1}/${quizGroups.length})`, {
          x: 0.5,
          y: 0.5,
          w: "90%",
          fontSize: 28,
          bold: true,
          color: "363636",
        });

        let quizContent = "";
        questionGroup.forEach((q: any, idx: number) => {
          const questionNumber = groupIndex * questionsPerSlide + idx + 1;
          quizContent += `Q${questionNumber}: ${q.question}\n`;
          q.options.forEach((opt: string, optIdx: number) => {
            quizContent += `   ${String.fromCharCode(65 + optIdx)}) ${opt}\n`;
          });
          quizContent += "\n";
        });

        slide.addText(quizContent, {
          x: 0.5,
          y: 2.0,
          w: "90%",
          fontSize: 14,
          color: "666666",
          align: "left",
          valign: "middle"
        });
      });

      quizGroups.forEach((questionGroup, groupIndex) => {
        slide = pres.addSlide({ masterName: "MASTER_SLIDE" });
        slide.addText(`${module.title} - Quiz Solutions (${groupIndex + 1}/${quizGroups.length})`, {
          x: 0.5,
          y: 0.5,
          w: "90%",
          fontSize: 28,
          bold: true,
          color: "363636",
        });

        let solutionsContent = "";
        questionGroup.forEach((q: any, idx: number) => {
          const questionNumber = groupIndex * questionsPerSlide + idx + 1;
          const correctAnswerLetter = String.fromCharCode(65 + q.correctAnswer);
          const correctAnswerText = q.options[q.correctAnswer];

          solutionsContent += `Q${questionNumber}: Answer: ${correctAnswerLetter}) ${correctAnswerText}\n`;
          solutionsContent += `   Explanation: ${q.explanation}\n\n`;
        });

        slide.addText(solutionsContent, {
          x: 0.5,
          y: 2.0,
          w: "90%",
          fontSize: 14,
          color: "666666",
          align: "left",
          valign: "middle"
        });
      });
    }
  });

  pres.writeFile({ fileName: `${courseData.title.replace(/[^a-zA-Z0-9]/g, '_')}_Slides.pptx` });
}
