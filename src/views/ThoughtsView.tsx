import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { thoughts } from '../data/thoughts';

// Helper function to render markdown-style bold text
const renderText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.replace(/\*\*/g, '');
      return <strong key={index} style={{ fontWeight: 500, color: '#E6E6E6' }}>{boldText}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
};

const MyThoughts: React.FC = () => {
  const [selectedThought, setSelectedThought] = useState<string | null>(null);

  const selectedThoughtData = selectedThought 
    ? thoughts.find(t => t.id === selectedThought)
    : null;

  // List View
  if (!selectedThoughtData) {
    return (
      <div 
        style={{ 
          minHeight: '100vh',
          backgroundColor: '#0E0F12',
          color: '#E6E6E6',
          paddingTop: '80px',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 24px' }}>
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            style={{ marginBottom: '80px' }}
          >
            <h1 
              style={{ 
                fontSize: '14px',
                fontWeight: 400,
                letterSpacing: '0.1em',
                color: '#9A9A9A',
                marginBottom: '8px',
                textTransform: 'uppercase'
              }}
            >
              THOUGHTS
            </h1>
            <div style={{ width: '24px', height: '1px', backgroundColor: '#9A9A9A', marginBottom: '16px' }} />
            <p 
              style={{ 
                fontSize: '15px',
                fontWeight: 400,
                color: '#9A9A9A',
                lineHeight: 1.6,
                maxWidth: '500px'
              }}
            >
              Fragments of how I see things.
            </p>
          </motion.div>

          {/* Thoughts List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {thoughts.map((thought, index) => (
              <motion.div
                key={thought.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: [0.4, 0, 0.2, 1]
                }}
                style={{
                  cursor: 'pointer',
                  padding: '0',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setSelectedThought(thought.id)}
                onMouseEnter={(e) => {
                  const title = e.currentTarget.querySelector('.thought-title') as HTMLElement;
                  const arrow = e.currentTarget.querySelector('.thought-arrow') as HTMLElement;
                  if (title) title.style.color = '#4A6FA5';
                  if (arrow) arrow.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={(e) => {
                  const title = e.currentTarget.querySelector('.thought-title') as HTMLElement;
                  const arrow = e.currentTarget.querySelector('.thought-arrow') as HTMLElement;
                  if (title) title.style.color = '#E6E6E6';
                  if (arrow) arrow.style.transform = 'translateX(0)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
                  <span 
                  style={{ 
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#9A9A9A',
                    minWidth: '32px',
                    fontVariantNumeric: 'tabular-nums'
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div style={{ flex: 1 }}>
                  <h2 
                    className="thought-title"
                    style={{ 
                      fontSize: '18px',
                      fontWeight: 500,
                      color: '#E6E6E6',
                      marginBottom: '4px',
                      lineHeight: 1.4,
                      transition: 'color 0.3s ease'
                    }}
                  >
                    {thought.shortTitle}
                  </h2>
                  <div 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      marginTop: '8px'
                    }}
                  >
                    <span 
                      className="thought-arrow"
                      style={{ 
                        fontSize: '14px',
                        fontWeight: 400,
                        color: '#9A9A9A',
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      → Read
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Detail View
  return (
    <div 
      style={{ 
        minHeight: '100vh',
        backgroundColor: '#0E0F12',
        color: '#E6E6E6',
        paddingTop: '80px',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
      }}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '80px 24px' }}>
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          onClick={() => setSelectedThought(null)}
          style={{
            background: 'none',
            border: 'none',
            color: '#9A9A9A',
            fontSize: '14px',
            fontWeight: 400,
            cursor: 'pointer',
            padding: '0',
            marginBottom: '48px',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            transition: 'color 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#E6E6E6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#9A9A9A';
          }}
        >
          ← All thoughts
        </motion.button>

        {/* Thought Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{ marginBottom: '64px' }}
        >
          <h1 
            style={{ 
              fontSize: '28px',
              fontWeight: 600,
              color: '#E6E6E6',
              marginBottom: '16px',
              lineHeight: 1.3,
              letterSpacing: '-0.02em'
            }}
          >
            {selectedThoughtData.title}
          </h1>
          <div style={{ width: '24px', height: '1px', backgroundColor: '#9A9A9A', marginBottom: '16px' }} />
          <p 
            style={{ 
              fontSize: '14px',
              fontWeight: 400,
              color: '#9A9A9A',
              lineHeight: 1.6,
              fontStyle: 'italic'
            }}
          >
            Written to remember, not to convince.
          </p>
        </motion.div>

        {/* Thought Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          style={{
            lineHeight: 1.7,
            fontSize: '16px',
            fontWeight: 400,
            color: '#E6E6E6'
          }}
        >
          {selectedThoughtData.content.split('\n\n').map((paragraph, pIndex) => {
            // Check if paragraph is a heading (starts and ends with **)
            if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**') && !paragraph.includes('\n')) {
              const headingText = paragraph.replace(/\*\*/g, '').trim();
              return (
                <motion.h3
                  key={pIndex}
                  style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#E6E6E6',
                    marginTop: '48px',
                    marginBottom: '24px',
                    lineHeight: 1.4,
                    letterSpacing: '-0.01em'
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: pIndex * 0.05 }}
                >
                  {headingText}
                </motion.h3>
              );
            }
            
            // Regular paragraph
            // Check if it's a standalone short line (for emphasis)
            const isStandaloneLine = paragraph.trim().length < 80 && !paragraph.includes('.') && paragraph.trim().length > 10;
            
            return (
              <motion.p
                key={pIndex}
                style={{
                  marginBottom: isStandaloneLine ? '32px' : '24px',
                  lineHeight: 1.7,
                  fontSize: isStandaloneLine ? '18px' : '16px',
                  fontWeight: isStandaloneLine ? 500 : 400,
                  color: '#E6E6E6'
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: pIndex * 0.05 }}
              >
                {renderText(paragraph)}
              </motion.p>
            );
          })}
        </motion.div>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{
            marginTop: '80px',
            paddingTop: '32px',
            borderTop: '1px solid rgba(154, 154, 154, 0.2)'
          }}
        >
          <p 
            style={{ 
              fontSize: '13px',
              fontWeight: 400,
              color: '#9A9A9A',
              fontVariantNumeric: 'tabular-nums'
            }}
          >
            {new Date(selectedThoughtData.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default MyThoughts;
