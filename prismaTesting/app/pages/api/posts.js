import { prisma } from "@/server/db/client";
function titleFromCode(code) {
  return code.trim().split("\n")[0].replace("//", "");
}

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const posts = await prisma.post.findMany({
          orderBy: {
            createdAt: "desc",
          },
        });
        res.status(200).json(posts);
      } catch (error) {
        res.status(500).json({ error: "Failed to retrieve posts" });
      }
      break;
    case "POST":
      console.log("hi");
      const { selectedLanguage, codeSnippet } = req.body;
      const title = titleFromCode(codeSnippet);
      const code = codeSnippet;
      const language = selectedLanguage;
      const post = await prisma.post.create({
        data: {
          title,
          language,
          code,
        },
      });
      res.status(201).json(post);
      break;
    default:
      res.setHeader("Allow", [, "GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
