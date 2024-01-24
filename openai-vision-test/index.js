import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({ apiKey: process.env.API_KEY });

function pause(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
    let tags = [];
    let i = 1;

    for (let url of imageUrls) {
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4-vision-preview",
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: "Generate as many tags as possible for the following image each being only one or two words that describe an object found in the image. If you find multiple of the same kind of object in the image include a count next to it like '3 people' or '5 trucks'. Maintain consistent formatting like putting the count before the tag name. Return them as a csv",
                            },
                            {
                                type: "image_url",
                                image_url: {
                                    url: url,
                                },
                            },
                        ],
                    },
                ],
            });

            let responseTags = response.choices[0];
            responseTags = responseTags.message.content.split(",");

            for (let tag of responseTags) {
                if (!tags.find((x) => x === tag)) {
                    tags.push(tag);
                }
            }
        } catch (error) {
            console.log(error);
            console.log(url);
        }

        console.log(i++);
    }

    console.log(tags);
}
main();
