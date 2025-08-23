import { RainbowButton } from "./magicui/rainbow-button";
import { TextAnimate } from "./magicui/text-animate";

const Hero = () => {
  const scrollToGenerator = () => {
    const generatorSection = document.querySelector(
      ".password-generator-section"
    );
    if (generatorSection) {
      generatorSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white/20 backdrop-blur-md text-gray-800 py-20 relative overflow-hidden border-b border-white/20">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-indigo-500/10"></div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <TextAnimate
          animation="slideUp"
          by="word"
          duration={0.8}
          className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
        >
          Password Generator
        </TextAnimate>

        <TextAnimate
          animation="fadeIn"
          by="word"
          delay={0.3}
          duration={0.6}
          className="text-xl md:text-2xl mb-8 text-gray-600"
        >
          Create secure, random passwords with customizable options
        </TextAnimate>

        <div className="mb-8">
          <RainbowButton
            onClick={scrollToGenerator}
            size="lg"
            className="font-semibold text-lg px-8 py-4"
          >
            🔐 Generate Password Now
          </RainbowButton>
        </div>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <TextAnimate animation="blurIn" delay={0.6} by="character">
              Highly Secure
            </TextAnimate>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <TextAnimate animation="blurIn" delay={0.8} by="character">
              Customizable Length
            </TextAnimate>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <TextAnimate animation="blurIn" delay={1.0} by="character">
              Multiple Character Sets
            </TextAnimate>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
