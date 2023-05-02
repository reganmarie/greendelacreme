import React from 'react';

const puns = [
  "Don't be a wall-flower, embrace your plant power!",
"Lettuce grow together in this garden of life.",
"I be-leaf in the power of green thumbs.",
"Stay rooted and bloom where you are planted.",
"You're succulent-ly awesome!",
"It's thyme to get your hands dirty!",
"We're all just a bunch of wildflowers in this world.",
"You're the apple of my iris.",
"Grow through what you go through.",
"Fern-ly speaking, gardening is the best therapy.",
"Water you doing? Keep calm and garden on!",
"Bloom where you're planted and let your colors shine.",
"Never underestimate the power of a daisy.",
"Don't stop be-leafing in yourself!",
"Peas, love, and plants.",
"Keep calm and put your roots down.",
"I'm rooting for you!",
"You make my heart beet faster.",
"Plant seeds of kindness and watch them grow.",
"Life would succ without plants!",
"Sunflowers always turn their face towards the sun, just like we turn towards growth and positivity.",
"Don't worry, be hoppy! Keep planting those seeds.",
"Don't let anyone trample your daisy dreams.",
"Never leaf a plant behind!",
"I'm so proud of you, you're blooming amazing!",
"You're my forever plant-nerd partner.",
"What's up, buttercup? Just here, enjoying the garden life.",
"You're the petal to my metal.",
"I'm rooting for a green future!",
"Cacti make great friends; they never desert you.",
"Plant smiles and let your garden grow!",
"I'm a fungi when I'm in the garden!",
"Bee-lieve in the power of pollinators.",
"Just a dandelion in a world of roses.",
"I'm on cloud fern. Life is blooming beautifully.",
"Gardeners have the best soil-utions!",
"Don't leaf me hanging; let's be plant pals!",
"Don't be afraid to take risks and branch out.",
"Parsley, sage, rosemary, and thyme—just a sprinkle of herb puns to make your day!",
"It's a-MAIZE-ing how much joy plants can bring.",
"You're so un-be-leaf-able!",
"Sow much to do, so little thyme!",
"Plant kindness and watch it grow like wildflowers.",
"Life is succulent with you by my side.",
"I carrot believe how amazing this garden is turning out!",
"You're a perennial source of inspiration!",
"Gardeners have the best dirt on how to enjoy life.",
"You're vine-tastic!",
"Water you waiting for? Let's get planting!",
"Bee kind, bee plantful!",
"Life is better with a garden by your side.",
"You're blooming into an incredible gardener!",
"Planting seeds of happiness, one pot at a time.",
"Aloe you vera much!",
"I'm so thyme-pressed with your green thumb skills.",
"Lettuce turnip the beet!"
]



const getRandomJoke = () => {
  const RandomIndex = Math.floor(Math.random() * puns.length);
  return puns[RandomIndex]
}

export default function PunList() {
  const RandomJoke = getRandomJoke();


  return (
<>

    <div className="opacity-90 w-2/6 fixed bottom-0 left-5 mb-10 max-w-[300px] pun ">
        <div className="flex inline-start">
            <div className=" shadow-2xl p-4 rounded-2xl border-1 border-gray-50">
                <div className="flex flex-col">
                    <div>
                        <h2 className="font-bold text-gray-600 text-center">Leafy Humor</h2>
                    </div>
                        <div className="flex flex-row space-x-4 items-center">
                            <div>
                                <span>
                                    <img alt='' className="h-10 w-12 flex fill-current" src="https://cdn.iconscout.com/icon/free/png-256/free-plant-45-112595.png?f=avif&w=256" />
                                </span>
                            </div>
                            <div>
                                <p> {RandomJoke}  </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full border-t-2 border-gray-100 mt-2">
                    </div>
                </div>
            </div>
        </div>
</>
  );
}
