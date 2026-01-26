import React from 'react';
import { SectionHeader } from './SectionHeader';
import { Github, Linkedin } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { teamData } from '../data';

export const Team: React.FC = () => {
  const founder = teamData[0];
  const members = teamData.slice(1);

  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-900 transition-colors" id="team">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeader
          label="Our Team"
          title="Meet The"
          subtitle="Minds"
          center
        />

        {/* Founder */}
        {founder && (
          <div className="flex justify-center mb-10 md:mb-16">
            <TiltCard className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl dark:shadow-none border border-gray-300 dark:border-gray-700 flex flex-col items-center text-center w-[90vw] md:max-w-sm relative overflow-hidden group active:border-secondary md:hover:border-secondary transition-colors z-0 hover:z-10 h-auto min-h-[420px]">
              {/* Background Decoration */}
              <div className="absolute top-0 w-full h-24 bg-primary opacity-5 dark:opacity-20"></div>
              
              <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-secondary p-1 bg-white dark:bg-gray-700 relative z-10 shadow-md">
                <img 
                  src={founder.image} 
                  alt={founder.name} 
                  loading="lazy" 
                  decoding="async" /* Performance */
                  width="160"
                  height="160"
                  className="w-full h-full rounded-full object-cover" 
                />
              </div>

              {/* Name + Role Section (takes equal vertical space always) */}
              <div className="flex-1 flex flex-col justify-center w-full">
                <h3 className="text-2xl font-bold text-text-dark dark:text-white mb-1 min-h-[64px] flex items-center justify-center">
                  {founder.name}
                </h3>
                <p className="text-gray-700 dark:text-gray-400 font-normal text-sm mb-1 flex items-center justify-center">
                  {founder.education}
                </p>
                <p className="text-secondary font-medium min-h-[32px] flex items-center justify-center">
                  {founder.role}
                </p>
              </div>

              {/* Icon always at bottom */}
              <div className="flex gap-4 mt-6 md:mt-auto">
                <a href={founder.linkedin} className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors shadow-sm">
                  <Linkedin size={18} />
                </a>
              </div>
            </TiltCard>
          </div>
        )}

        {/* Core Members */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-8 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {members.map((member, idx) => (
            <div key={idx} className="min-w-[85vw] md:min-w-0 snap-center h-full">
            <TiltCard className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl dark:shadow-none border border-gray-300 dark:border-gray-700 flex flex-col items-center text-center group active:border-secondary md:hover:border-secondary transition-colors relative z-0 hover:z-10 h-full md:h-[320px] active:scale-[0.98] duration-300">
              
              <div className="w-32 h-32 rounded-full overflow-hidden mb-5 border-2 border-gray-100 dark:border-gray-700 group-hover:border-secondary transition-colors relative shadow-inner">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  loading="lazy" 
                  decoding="async" /* Performance */
                  width="128"
                  height="128"
                  className="w-full h-full object-cover transform md:group-hover:scale-110 transition-transform duration-500" 
                />
              </div>

              {/* Name + Role Section (forced equal alignment) */}
              <div className="flex-1 flex flex-col justify-center w-full">
                <h4 className="text-lg font-bold text-text-dark dark:text-white mb-1 min-h-[48px] flex items-center justify-center">
                  {member.name}
                </h4>
                <p className="text-gray-700 dark:text-gray-400 text-sm mb-5 font-medium min-h-[28px] flex items-center justify-center">
                  {member.role}
                </p>
              </div>

              {/* Icons stick to bottom */}
              <div className="flex gap-4 opacity-100 md:opacity-70 md:group-hover:opacity-100 transition-opacity mt-auto">
                <a href={member.linkedin} className="text-primary dark:text-secondary hover:text-secondary dark:hover:text-white transition-colors transform md:hover:scale-110">
                  <Linkedin size={20} />
                </a>
              </div>

            </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
