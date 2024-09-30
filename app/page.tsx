'use client';

import { useChat } from 'ai/react';
import { BiMessageSquareDots,  BiMemoryCard } from 'react-icons/bi';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 3,
  });
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="space-y-4">
        {messages.map(m => (
          <div key={m.id} className="whitespace-pre-wrap">
            <div>
              <div className="font-bold">
                {m.role === 'assistant' ? 'Noodle' : 'You'}
              </div>
              <p>
                {m.content.length > 0 ? (
                  m.content
                ) : (
                <span className="italic font-light">
                  {m?.toolInvocations?.[0]?.toolName === 'addResource' ? (
                    <>
                      <BiMemoryCard className="inline-block mr-1" /> 
                      {'added to my memory (' + m?.toolInvocations?.[0].toolName + ')'}
                    </>
                  ) : m?.toolInvocations?.[0]?.toolName === 'getInformation' ? (
                    <>
                      <BiMessageSquareDots className="inline-block mr-1" />
                      {'checking my memory (' + m?.toolInvocations?.[0].toolName + ')'}
                    </>
                  ) : null}
                </span>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}