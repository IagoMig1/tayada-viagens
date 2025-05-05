import { FaWhatsapp, FaSuitcaseRolling } from "react-icons/fa";

const PrivateTravel = () => {
  return (
    <section className="bg-white py-12 px-4 md:px-10 lg:px-24">
      <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#f0f0ff] to-[#ffffff] rounded-2xl shadow-lg p-8 md:p-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-teal-600 text-[#ffffff] p-4 rounded-full mb-4">
            <FaSuitcaseRolling size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Viagens Privativas
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl">
            Prefere uma viagem feita só para você ou seu grupo? A Tayada Viagens oferece experiências exclusivas e personalizadas com todo o conforto e segurança que você merece.
          </p>

          <div className="w-full flex flex-col md:flex-row justify-center gap-4 mt-8">
            <a
              href="https://wa.me/551236537242?text=Olá! Tenho interesse em uma viagem privativa com a Tayada Viagens."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#007f5f] hover:bg-[#006f53] text-white px-6 py-3 rounded-full text-lg transition duration-300 shadow-md"
            >
              <FaWhatsapp size={20} />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivateTravel;
