import { Body, Controller, Post } from "@nestjs/common";
const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: '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' });


@Controller('gpt')
export class ChatGPTController {
    @Post()
    async chat(@Body() listeArticle : any) : Promise<String> {
        const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "Que puis-je faire avec la liste d'achats suivante :"+listeArticle.liste}],
        model: "gpt-3.5-turbo",
  });
  console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
}
}