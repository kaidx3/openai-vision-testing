import OpenAI from "openai";
import "dotenv/config";
import { imageUrls } from "../private/imageUrls.js";

const openai = new OpenAI({ apiKey: process.env.API_KEY });

async function main() {
    let tags = [];
    let imageObjects = [];
    let imageIncrement = 0;

    for (let url of imageUrls) {
        imageObjects.push({
            type: "image_url",
            image_url: {
                url: url,
            },
        });
    }

    try {
        while (imageIncriment < imageObjects.length) {
            let requestImagesArray = [];
            let maxIncrement = imageIncrement + 10;
            let frameGroup = 1;

            for (imageIncrement; imageIncrement <= maxIncrement; imageIncrement++) {
                if (imageIncrement == imageObjects.length) {
                    console.log("All frames analyzed.");
                    break;
                }

                requestImagesArray.push(imageObjects[imageIncriment]);
            }

            const response = await openai.chat.completions.create({
                model: "gpt-4-vision-preview",
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: `
                                    Generate as many tags as possible for the following images. 
                                    The tags should be only one or two words that describe an object found in the image. 
                                    If you find multiple of the same kind of object in the image include a count next to it like 
                                    '3 people' or '5 trucks'. 
                                    Try to maintain a focus on things that matter in a construction setting, trees, mountains, and other similar things
                                    are not necessarily important.
                                    Maintain consistent formatting like putting the count before the tag name. 
                                    If there is only one of something do not include a count. 
                                    Do not include things that are not in the real world like "pixelation" or "blurry".
                                    Pay extra attention to the count of things, it is important to always include the correct count if there is more than one of something.
                                    Make sure to include as many tags as possible, we want to get a record of everything that is in frame and is relevant to the construction site.
                                    Do not include the count of "1" as it is implied by the lack of a count.
                                    Return the tags as a csv and only return the csv of tags do not include anything else whatesoever, this is INSANELY important.
                                `,
                            },
                            ...requestImagesArray,
                        ],
                    },
                ],
            });

            let responseTags = response.choices[0].message.content.split(",");

            for (let tag of responseTags) {
                let existingTag = tags.find((t) => t.frameGroup == frameGroup && t.tag.includes(tag));

                if (existingTag == null) {
                    tags.push({ tag: tag, frameGroup: frameGroup++ });
                } else if (/\d/.test(existingTag) && /\d/.test(existingTag)) {
                    let existingTagCount = existingTag.match(/\d+/)[0];
                    let newTagCount = existingTagCount.match(/\d+/)[0];

                    if (newTagCount > existingTagCount) {
                        tags[tags.indexOf(existingTag)] = tag;
                    }
                }
            }

            requestImagesArray = [];
        }
    } catch (error) {
        console.log(error);
    }

    console.log(tags.sort((a, b) => a.frameGroup - b.frameGroup));
}
main();
