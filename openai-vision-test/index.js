import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({ apiKey: process.env.API_KEY });

async function main() {
    const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: "Generate as many tags as possible for the following image each being only one or two words that describe an object found in the image. If you find multiple of the same kind of object in the image include a count next to it like '3 people' or '5 trucks'. Return them as a csv",
                    },
                    {
                        type: "image_url",
                        image_url: {
                            url: "https://www.shutterstock.com/image-photo/man-standing-far-away-on-260nw-530129707.jpg",
                        },
                    },
                ],
            },
        ],
    });
    console.log(response.choices[0]);
}
main();
