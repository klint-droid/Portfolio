import React from "react";
import { Link } from "react-router-dom";
import { FaJava, FaNodeJs, FaLaravel, FaArrowRight } from "react-icons/fa";
import { 
  SiHtml5, SiCss3, SiJavascript, SiReact, 
  SiPhp, SiPython, SiMysql, 
  SiTailwindcss,
  SiGit, SiGithub, SiPostman, SiDocker, SiLinux, SiJenkins, SiTypescript,
  SiSpringboot
} from 'react-icons/si';
import { TbBrandCSharp } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";
import { BiLogoPostgresql } from "react-icons/bi";
import AWSIcon from 'react-aws-icons/dist/aws/logo/AWS';
import AWSEC2Icon from 'react-aws-icons/dist/aws/logo/EC2';
import AWSLambdaIcon from 'react-aws-icons/dist/aws/logo/Lambda';
import AWSS3Icon from 'react-aws-icons/dist/aws/logo/S3';
import AWSCloudFrontIcon from 'react-aws-icons/dist/aws/logo/CloudFront';
import AWSRdsIcon from 'react-aws-icons/dist/aws/logo/RDS';

const TechStack = () => {
  const Badge = ({ icon: IconBase, name, colorClass, isAwsIcon }) => (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[var(--border-color)] bg-[var(--sidebar-bg)] hover:border-[#D97757]/60 hover:bg-[var(--card-hover)] transition-all cursor-default shadow-2xs">
      {isAwsIcon ? (
        <IconBase size={14} />
      ) : (
        <IconBase className={`${colorClass} text-sm`} />
      )}
      <span className="claude-font-mono text-xs font-medium text-[var(--text-primary)]">{name}</span>
    </div>
  );

  return (
    <section id="techstack" className="scroll-mt-20 bento-card bg-[var(--card-bg)] border-[var(--border-color)]">
      <div className="bento-card-header">
        <div className="bento-card-title">
          <span className="section-number claude-font-mono text-xs text-[#D97757]">04 // TECH STACK</span>
        </div>
        <Link
          to="/3d"
          className="claude-font-mono text-xs text-[var(--text-muted)] hover:text-[#D97757] flex items-center gap-1.5 transition-colors group"
        >
          <span>3D stack cosmos</span>
          <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <h3 className="claude-font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
            Frontend Engineering
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge icon={SiHtml5} name="HTML5" colorClass="text-orange-500" />
            <Badge icon={SiCss3} name="CSS3" colorClass="text-blue-500" />
            <Badge icon={SiJavascript} name="JavaScript" colorClass="text-amber-400" />
            <Badge icon={SiTypescript} name="TypeScript" colorClass="text-blue-500" />
            <Badge icon={SiReact} name="React 19" colorClass="text-cyan-400" />
            <Badge icon={SiTailwindcss} name="Tailwind CSS" colorClass="text-sky-400" />
          </div>
        </div>

        <div>
          <h3 className="claude-font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
            Backend & Databases
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge icon={FaNodeJs} name="Node.js" colorClass="text-emerald-500" />
            <Badge icon={SiPhp} name="PHP" colorClass="text-indigo-400" />
            <Badge icon={FaLaravel} name="Laravel" colorClass="text-rose-500" />
            <Badge icon={SiPython} name="Python" colorClass="text-amber-500" />
            <Badge icon={FaJava} name="Java" colorClass="text-orange-500" />
            <Badge icon={SiSpringboot} name="Spring Boot" colorClass="text-emerald-500" />
            <Badge icon={TbBrandCSharp} name="C#" colorClass="text-indigo-500" />
            <Badge icon={SiMysql} name="MySQL" colorClass="text-blue-600" />
            <Badge icon={BiLogoPostgresql} name="PostgreSQL" colorClass="text-blue-400" />
          </div>
        </div>

        <div>
          <h3 className="claude-font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
            Developer Tools & DevOps
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge icon={VscVscode} name="VS Code" colorClass="text-blue-500" />
            <Badge icon={SiGit} name="Git" colorClass="text-orange-500" />
            <Badge icon={SiGithub} name="GitHub" colorClass="text-[var(--text-primary)]" />
            <Badge icon={SiPostman} name="Postman" colorClass="text-orange-500" />
            <Badge icon={SiDocker} name="Docker" colorClass="text-sky-500" />
            <Badge icon={SiLinux} name="Linux" colorClass="text-amber-400" />
            <Badge icon={SiJenkins} name="Jenkins" colorClass="text-rose-500" />
          </div>
        </div>

        <div>
          <h3 className="claude-font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
            Cloud Architecture (AWS)
          </h3>
          <div className="flex flex-wrap gap-2">
            <Badge icon={AWSIcon} name="AWS" isAwsIcon />
            <Badge icon={AWSEC2Icon} name="AWS EC2" isAwsIcon />
            <Badge icon={AWSLambdaIcon} name="AWS Lambda" isAwsIcon />
            <Badge icon={AWSS3Icon} name="AWS S3" isAwsIcon />
            <Badge icon={AWSCloudFrontIcon} name="CloudFront" isAwsIcon />
            <Badge icon={AWSRdsIcon} name="AWS RDS" isAwsIcon />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;