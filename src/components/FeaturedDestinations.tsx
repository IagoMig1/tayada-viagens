import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from 'lucide-react';
import TravelCard from './TravelCard';
import { Travel } from '../data/travelData';
interface FeaturedDestinationsProps {
  destinations: Travel[];
}
const FeaturedDestinations: React.FC<FeaturedDestinationsProps> = ({
  destinations
}) => {
  return <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Destinos em Destaque
          </h2>
          <Link to="/destinos" className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
            Ver todos
            <ChevronRightIcon size={20} className="ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map(destination => <TravelCard key={destination.id} travel={destination} />)}
        </div>
      </div>
    </section>;
};
export default FeaturedDestinations;