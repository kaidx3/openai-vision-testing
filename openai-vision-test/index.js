import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({ apiKey: process.env.API_KEY });

function pause(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const imageUrls = [
    "https://www.dropbox.com/scl/fi/mjn8axq4e3drbrpy2kys7/image-0.jpg?rlkey=iao8z1uv0cqnh2ftzdvfriy3e&raw=1",
    "https://www.dropbox.com/scl/fi/247cqy4oxs8izfqb81ej5/image-1.jpg?rlkey=doi96jguqkl1gv84lba5o7mbc&raw=1",
    "https://www.dropbox.com/scl/fi/yyoa3spoichplz5lx5nuz/image-2.jpg?rlkey=e9gw7qwqalyktei39aawws3eq&raw=1",
    "https://www.dropbox.com/scl/fi/38by6gto43rln6m5so4ik/image-3.jpg?rlkey=o6g02e2hzz8100tph8u77587y&raw=1",
    "https://www.dropbox.com/scl/fi/gdjm1l5g2b3llvt983tf8/image-4.jpg?rlkey=decii4wzqt4inq96aib61irqn&raw=1",
    "https://www.dropbox.com/scl/fi/gdjm1l5g2b3llvt983tf8/image-4.jpg?rlkey=decii4wzqt4inq96aib61irqn&raw=1",
    "https://www.dropbox.com/scl/fi/xwucguy4larew2et9yrhx/image-6.jpg?rlkey=a8bl7x4zgtmoftw5np5qc24zl&raw=1",
    "https://www.dropbox.com/scl/fi/ru6ghpeczawowja814bho/image-7.jpg?rlkey=x4phso3klbrls5ptsruk50s2u&raw=1",
    "https://www.dropbox.com/scl/fi/x2wnrwa1cjgd1hebzun8t/image-8.jpg?rlkey=00ukgcxu863u0nnu1ez1npt3c&raw=1",
    "https://www.dropbox.com/scl/fi/ymzxgltysbpd4opzg44jf/image-9.jpg?rlkey=w67d4hddmbchw2t1w2qz3xsy6&raw=1",
    "https://www.dropbox.com/scl/fi/zh4yfgugubnl2ryjh4iea/image-10.jpg?rlkey=lbz5fq5nlt3u3ly65xo3zhvoc&raw=1",
    "https://www.dropbox.com/scl/fi/cpjy09167o417yd2rd7b1/image-11.jpg?rlkey=a2g9v224xlm6v0u9auvaxhqcy&raw=1",
    "https://www.dropbox.com/scl/fi/n4aoyvqaqne4ijtmyzio6/image-12.jpg?rlkey=7sihxhwgn9jkdgtccrcpo1y53&raw=1",
    "https://www.dropbox.com/scl/fi/z13izs9ypiitnlvnhascz/image-13.jpg?rlkey=254bn13bel3xdrkq4x8gx0qdi&raw=1",
    "https://www.dropbox.com/scl/fi/qjdz6fqy5zdwxx57rkks4/image-14.jpg?rlkey=flmuhrgfomynj1vdhdxlmtgje&raw=1",
    "https://www.dropbox.com/scl/fi/10gg73a015vh79b7v3wpg/image-15.jpg?rlkey=9bbdz1kctd2amewqggf74l8ym&raw=1",
    "https://www.dropbox.com/scl/fi/9yoggb3kj0xak1cbsvza5/image-16.jpg?rlkey=jtm9g1sl9jt0gm681i61triix&raw=1",
    "https://www.dropbox.com/scl/fi/bhhb3mrcuprb9s2ptsj4y/image-17.jpg?rlkey=o5oyfx7kebwsvq6tjjx5ilpyr&raw=1",
    "https://www.dropbox.com/scl/fi/h6znwsbfj13wqcvfjsh7d/image-18.jpg?rlkey=6qjkjyudyou8eifcebkafcsac&raw=1",
    "https://www.dropbox.com/scl/fi/eyvz616x3u67rgsewakjr/image-19.jpg?rlkey=rgo33qwvr48yj5o9erlqfzk5w&raw=1",
    "https://www.dropbox.com/scl/fi/srdzj2b0tix0vwv89u4px/image-20.jpg?rlkey=l54cirwwb1lbsyxa4pxty0v3p&raw=1",
    "https://www.dropbox.com/scl/fi/hojjqdu2op91ixf1b5h81/image-21.jpg?rlkey=4hmll2jm0o8btu70o6zqsrma8&raw=1",
    "https://www.dropbox.com/scl/fi/u8uzxjser10tjee539hws/image-22.jpg?rlkey=8ec10rciagx6i2a9zcndlilrj&raw=1",
    "https://www.dropbox.com/scl/fi/4xdojxdr9vi222mhlj072/image-23.jpg?rlkey=0zaagatyv1m6x65y9j2bl3wwf&raw=1",
    "https://www.dropbox.com/scl/fi/7i0mmfykd2eh536k1l6rt/image-24.jpg?rlkey=atgoqo561dkm57lp7gf1aiw6g&raw=1",
    "https://www.dropbox.com/scl/fi/wunuj3tiajv4kxabqiky9/image-25.jpg?rlkey=xalg4f3vlem06zawtld0hcm25&raw=1",
    "https://www.dropbox.com/scl/fi/s7ve9uloya4hbncqbi847/image-26.jpg?rlkey=svhgceobu79haqtz40307upnf&raw=1",
    "https://www.dropbox.com/scl/fi/qxkhmy5rqvn5si9zse56n/image-27.jpg?rlkey=67fucwnch6wpnfwiirpu1uwy7&raw=1",
    "https://www.dropbox.com/scl/fi/x1sqgv6bqzu4zh6sgyjyf/image-28.jpg?rlkey=isoyim8bmrcz7egssrng8mame&raw=1",
    "https://www.dropbox.com/scl/fi/v3gvlrnoxyehb8eikw1q1/image-29.jpg?rlkey=25r1uhq6eni11v6hrwd6rvtdx&raw=1",
    "https://www.dropbox.com/scl/fi/8ykzuqjo2w14r8u3e4zuv/image-30.jpg?rlkey=dal3g4k4zsulomjapb5jsqcml&raw=1",
    "https://www.dropbox.com/scl/fi/1wmwucxh42ut86u1obzsl/image-31.jpg?rlkey=n7oqflfhy0m89t9rtkrr186lv&raw=1",
    "https://www.dropbox.com/scl/fi/0ougsup150n4u1188wej5/image-32.jpg?rlkey=vya12o581iu1z1maffs1fr9x8&raw=1",
    "https://www.dropbox.com/scl/fi/8cl9sex2dfsz32b0zh8bz/image-33.jpg?rlkey=sp9wfsn26pxj25vg89zantbso&raw=1",
    "https://www.dropbox.com/scl/fi/rpl55e2bqvqqk0o93xpkg/image-34.jpg?rlkey=28vmf345bs32j36a7rvur62u8&raw=1",
    "https://www.dropbox.com/scl/fi/rnhkrn4em1w3u4cd9ed06/image-35.jpg?rlkey=qsk3004c1nvwpg9jvpogjtjw4&raw=1",
    "https://www.dropbox.com/scl/fi/c5txb2wvqntochtg9oq2w/image-36.jpg?rlkey=ltffu126ixv44lth5dkadmnap&raw=1",
    "https://www.dropbox.com/scl/fi/87mkw7pqqz6odo9ggb21a/image-37.jpg?rlkey=jq0u32gk9deakbrd8k9pqm293&raw=1",
    "https://www.dropbox.com/scl/fi/limju5fx688wv11m03o11/image-38.jpg?rlkey=eder72zy32xfj5rtqxplpv0ry&raw=1",
    "https://www.dropbox.com/scl/fi/ki5um8tgvq85bhkh66732/image-39.jpg?rlkey=vtoqpdra6gz7zo9c60p4nzt44&raw=1",
    "https://www.dropbox.com/scl/fi/weae9d4s5oy6rlvkdcxip/image-40.jpg?rlkey=kgtv5h8x3whey5j12y9ogiutv&raw=1",
    "https://www.dropbox.com/scl/fi/sj352mrzsh0ur48pj958r/image-41.jpg?rlkey=vqvrymvlrgfwsde7fdgt5kqy3&raw=1",
    "https://www.dropbox.com/scl/fi/ej496vg96b58ycldemsz8/image-42.jpg?rlkey=xpynt4tenvc06467xplyalqau&raw=1",
    "https://www.dropbox.com/scl/fi/82hg4qznizu33vu1wy8kj/image-43.jpg?rlkey=6evvl13oo6ied6it1i0zjlvl8&raw=1",
    "https://www.dropbox.com/scl/fi/s9ok2gqq567gdog5ua81h/image-44.jpg?rlkey=6by3uc44bj36n704n6hu6dc67&raw=1",
    "https://www.dropbox.com/scl/fi/7w6f96h5k1rdbgajmod2a/image-45.jpg?rlkey=qu8cdesqt7kr4c26d49hr1444&raw=1",
    "https://www.dropbox.com/scl/fi/00vowghhyagqobfwz9vcr/image-46.jpg?rlkey=iig6dsuhxog3cz96cml1q1zzb&raw=1",
    "https://www.dropbox.com/scl/fi/epuud5jf6spk39kf6gsmx/image-47.jpg?rlkey=dzvhaykf49u14nq41fq1gn6kv&raw=1",
    "https://www.dropbox.com/scl/fi/dhhkmpxs76qgvqmjxs7lu/image-48.jpg?rlkey=vzj9egms3ekwruo8m8kudx35i&raw=1",
    "https://www.dropbox.com/scl/fi/ahbhwul7q42t43w4dhl4m/image-49.jpg?rlkey=xmaw0wsr5cj9i0iqwiu24ekn7&raw=1",
    "https://www.dropbox.com/scl/fi/iq1dixtong5w264l2dim0/image-50.jpg?rlkey=47bp5fiq99w1wawijfmz6w24c&raw=1",
    "https://www.dropbox.com/scl/fi/4ptftk7kis9261uc6vuip/image-51.jpg?rlkey=nn07m957jz5co7pii89nacedt&raw=1",
    "https://www.dropbox.com/scl/fi/g3cnavpbdbj4yq31kq7ew/image-52.jpg?rlkey=0adck7wl8845557m3fkqofwb7&raw=1",
    "https://www.dropbox.com/scl/fi/leme2dlgetffffivakz7q/image-53.jpg?rlkey=nf0ci0aebbzjagcipgs5r6hrg&raw=1",
    "https://www.dropbox.com/scl/fi/x939du0x2okkomudph6cb/image-54.jpg?rlkey=9y488bsvk6ns4vze27neicagb&raw=1",
    "https://www.dropbox.com/scl/fi/ipqwazcjftb2wk0bqn0aa/image-55.jpg?rlkey=snegk2nfkptvu6s6gw6zsvr1y&raw=1",
    "https://www.dropbox.com/scl/fi/dpxaiyfmgskx71xhr3ueb/image-56.jpg?rlkey=thwzf9li2znwajijpykv36cv1&raw=1",
    "https://www.dropbox.com/scl/fi/of5yer398onz2ehx80een/image-57.jpg?rlkey=mv9n5r48o1tzgyze6hdpv6f46&raw=1",
    "https://www.dropbox.com/scl/fi/b6s8miekd3uitb80972q3/image-58.jpg?rlkey=fehlzgmhr0fbl5e5nrbl6kwdh&raw=1",
    "https://www.dropbox.com/scl/fi/syh4677l4h7pws69sjyjf/image-59.jpg?rlkey=1y2qpzqzmnq2zt9ejdhpy847w&raw=1",
];

async function main() {
    let tags = [];
    let imageObjects = [];
    let imageIncriment = 0;

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
            let maxIncrement = imageIncriment + 10;
            let frameGroup = 1;

            for (imageIncriment; imageIncriment <= maxIncrement; imageIncriment++) {
                if (imageIncriment == imageObjects.length) {
                    console.log("return");
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
