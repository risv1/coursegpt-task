/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} from "docx";

export const generateWordDocument = (courseData: any) => {
  if (!courseData) {
    console.error("No course data available");
    return;
  }

  const children: any[] = [];

  children.push(
    new Paragraph({
      text: courseData.title,
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Duration: ", bold: true }),
        new TextRun(`${courseData.totalDuration} minutes`),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Target Audience: ", bold: true }),
        new TextRun(courseData.targetAudience),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 400 },
    }),
    new Paragraph({ text: "", spacing: { after: 400 } })
  );

  children.push(
    new Paragraph({
      text: "Table of Contents",
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 200 },
    })
  );

  children.push(
    new Paragraph({
      children: [
        new TextRun("Course Overview"),
        new TextRun({
          text: ".............................................................................................................",
          font: "Courier New",
        }),
        new TextRun("3"),
      ],
      spacing: { after: 100 },
    })
  );

  children.push(
    new Paragraph({
      children: [
        new TextRun("Learning Outcomes"),
        new TextRun({
          text: "............................................................................................................",
          font: "Courier New",
        }),
        new TextRun("4"),
      ],
      spacing: { after: 100 },
    })
  );

  courseData.modules.forEach((module: any, index: number) => {
    const pageNum = index * 3 + 5;
    children.push(
      new Paragraph({
        children: [
          new TextRun(`Module ${index + 1}: ${module.title}`),
          new TextRun({
            text: ".".repeat(80 - (module.title.length + 12)),
            font: "Courier New",
          }),
          new TextRun(`${pageNum}`),
        ],
        spacing: { after: 100 },
      })
    );
  });

  children.push(
    new Paragraph({ text: "", spacing: { after: 500 } }),
    new Paragraph({ text: "", pageBreakBefore: true })
  );

  children.push(
    new Paragraph({
      text: "Course Overview",
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 200 },
    }),
    new Paragraph({
      text: courseData.description,
      spacing: { after: 200 },
    }),
    new Paragraph({ text: "", spacing: { after: 200 } })
  );

  children.push(
    new Paragraph({
      text: "Learning Outcomes",
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 200 },
    })
  );

  courseData.learningOutcomes.forEach((outcome: string) => {
    children.push(
      new Paragraph({
        text: `• ${outcome}`,
        spacing: { after: 100 },
      })
    );
  });

  children.push(new Paragraph({ text: "", pageBreakBefore: true }));

  courseData.modules.forEach((module: any, moduleIndex: number) => {
    children.push(
      new Paragraph({
        text: `Module ${moduleIndex + 1}: ${module.title}`,
        heading: HeadingLevel.HEADING_1,
        spacing: { after: 200 },
      }),
      new Paragraph({
        children: [
          new TextRun({ text: "Duration: ", bold: true }),
          new TextRun(`${module.duration} minutes`),
        ],
        spacing: { after: 200 },
      }),
      new Paragraph({
        text: module.description,
        spacing: { after: 200 },
      })
    );

    children.push(
      new Paragraph({
        text: "Subtopics",
        heading: HeadingLevel.HEADING_2,
        spacing: { after: 200 },
      })
    );

    module.subtopics.forEach((subtopic: string) => {
      children.push(
        new Paragraph({
          text: `• ${subtopic}`,
          spacing: { after: 100 },
        })
      );
    });

    children.push(
      new Paragraph({
        text: "Resources",
        heading: HeadingLevel.HEADING_2,
        spacing: { after: 200, before: 200 },
      })
    );

    if (module.images && module.images.length > 0) {
      children.push(
        new Paragraph({
          text: "Image References:",
          heading: HeadingLevel.HEADING_3,
          spacing: { after: 100 },
        })
      );

      module.images.forEach((image: any) => {
        children.push(
          new Paragraph({
            text: `• ${image.title}`,
            spacing: { after: 50 },
          })
        );
      });
    }

    if (module.externalLinks && module.externalLinks.length > 0) {
      children.push(
        new Paragraph({
          text: "External Resources:",
          heading: HeadingLevel.HEADING_3,
          spacing: { after: 100, before: 100 },
        })
      );

      module.externalLinks.forEach((link: any) => {
        children.push(
          new Paragraph({
            text: `• ${link.title}`,
            spacing: { after: 50 },
          })
        );
      });
    }

    if (module.quiz && module.quiz.length > 0) {
      children.push(
        new Paragraph({
          text: "Quiz Questions",
          heading: HeadingLevel.HEADING_2,
          pageBreakBefore: true,
          spacing: { after: 200 },
        })
      );

      module.quiz.forEach((q: any, qIndex: number) => {
        children.push(
          new Paragraph({
            text: `Question ${qIndex + 1}: ${q.question}`,
            heading: HeadingLevel.HEADING_3,
            spacing: { after: 100 },
          })
        );

        q.options.forEach((opt: string, optIdx: number) => {
          children.push(
            new Paragraph({
              text: `${String.fromCharCode(65 + optIdx)}) ${opt}`,
              indent: { firstLine: 720 },
              spacing: { after: 50 },
            })
          );
        });

        children.push(new Paragraph({ text: "", spacing: { after: 100 } }));
      });

      children.push(
        new Paragraph({
          text: "Quiz Answers & Explanations",
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 200, before: 200 },
        })
      );

      module.quiz.forEach((q: any, qIndex: number) => {
        const correctAnswerLetter = String.fromCharCode(65 + q.correctAnswer);
        const correctAnswerText = q.options[q.correctAnswer];

        children.push(
          new Paragraph({
            text: `Question ${qIndex + 1}`,
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 100, after: 50 },
          })
        );

        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: "Answer: ", bold: true }),
              new TextRun(`${correctAnswerLetter}) ${correctAnswerText}`),
            ],
            spacing: { after: 50 },
          })
        );

        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: "Explanation: ", bold: true }),
              new TextRun(q.explanation),
            ],
            spacing: { after: 150 },
          })
        );
      });
    }

    if (moduleIndex < courseData.modules.length - 1) {
      children.push(new Paragraph({ text: "", pageBreakBefore: true }));
    }
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: children,
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${courseData.title.replace(
      /[^a-zA-Z0-9]/g,
      "_"
    )}_Document.docx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  });
};
