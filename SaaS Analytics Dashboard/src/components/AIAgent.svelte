<script>
    import { Robot, X, PaperPlaneRight, Sparkle } from 'phosphor-svelte';
    import { fly, fade } from 'svelte/transition';

    export let context = ''; // 'calendar', 'contacts', 'kanban'
    export let data = [];

    let isOpen = false;
    let messages = [
        { type: 'agent', text: 'Hi! I am your AI assistant. How can I help you optimize your workflow today?' }
    ];
    let inputText = '';
    let isTyping = false;

    $: suggestions = getSuggestions(context);

    function getSuggestions(ctx) {
        switch(ctx) {
            case 'calendar':
                return ['When is the best date to book a meeting?'];
            case 'contacts':
                return ['Which one of these people should I contact?'];
            case 'kanban':
                return ['Suggest me what task should next be done'];
            default:
                return [];
        }
    }

    function toggleChat() {
        isOpen = !isOpen;
    }

    async function handleSend(text = inputText) {
        if (!text.trim()) return;

        // Add user message
        messages = [...messages, { type: 'user', text }];
        inputText = '';
        isTyping = true;

        // Simulate network delay
        setTimeout(() => {
            const response = generateResponse(text, context, data);
            messages = [...messages, { type: 'agent', text: response }];
            isTyping = false;
        }, 1500);
    }

    function generateResponse(query, ctx, inputData) {
        const q = query.toLowerCase();

        if (ctx === 'calendar') {
            if (q.includes('best date') || q.includes('meeting')) {
                // Find first day with no events or few events
                // inputData expects calendarDays structure
                const bestDay = inputData.find(d => !d.events || d.events.length === 0);
                if (bestDay) {
                    return `Based on your schedule, the best date to book a meeting is ${bestDay.day}th. You have no events scheduled for that day.`;
                } else {
                    return "It looks like your schedule is quite full. You might want to check the 28th?";
                }
            }
        } 
        
        if (ctx === 'contacts') {
             if (q.includes('contact') || q.includes('people')) {
                // Heuristic: Pick a manager or random
                // inputData expects contacts array
                const recommendation = inputData.find(c => c.role === 'Manager') || inputData[0];
                return `Based on the company's current needs for oversight, I recommend contacting **${recommendation.name}**. They are a ${recommendation.role} and can help align the team.`;
             }
        }

        if (ctx === 'kanban') {
            if (q.includes('next') || q.includes('task') || q.includes('suggest')) {
                // inputData expects tasks array
                const todoTask = inputData.find(t => t.status === 'todo');
                if (todoTask) {
                    return `I suggest you tackle **"${todoTask.title}"** next. It's currently in 'To Do' and seems high priority.`;
                } else {
                    return "Great job! You have no tasks in 'To Do'. Maybe check 'In Progress'?";
                }
            }
        }

        return "I'm not sure about that specific request, but I can help you analyze your data if you use the suggested queries!";
    }

</script>

<div class="absolute bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
    
    <!-- Chat Window -->
    {#if isOpen}
    <div 
        transition:fly={{ y: 20, duration: 300 }}
        class="bg-white rounded-2xl shadow-2xl w-80 mb-4 overflow-hidden border border-gray-100 pointer-events-auto flex flex-col max-h-[500px]"
    >
        <!-- Header -->
        <div class="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-4 flex justify-between items-center text-white">
            <div class="flex items-center gap-2">
                <div class="bg-white/20 p-1.5 rounded-lg">
                    <Sparkle size={18} weight="fill" />
                </div>
                <span class="font-bold text-sm">AI Assistant</span>
            </div>
            <button on:click={toggleChat} class="hover:bg-white/20 p-1 rounded-lg transition-colors">
                <X size={18} />
            </button>
        </div>

        <!-- Messages -->
        <div class="flex-1 p-4 bg-gray-50 flex flex-col gap-3 overflow-y-auto h-64">
            {#each messages as msg}
                <div class="flex flex-col {msg.type === 'user' ? 'items-end' : 'items-start'}">
                    <div class="max-w-[85%] p-3 rounded-2xl text-xs font-medium leading-relaxed
                        {msg.type === 'user' 
                            ? 'bg-violet-500 text-white rounded-tr-sm' 
                            : 'bg-white text-gray-600 shadow-sm border border-gray-100 rounded-tl-sm'}"
                    >
                        {@html msg.text}
                    </div>
                </div>
            {/each}

            {#if isTyping}
                <div class="flex items-start">
                    <div class="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100">
                        <div class="flex gap-1">
                            <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                            <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                            <div class="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                        </div>
                    </div>
                </div>
            {/if}
        </div>

        <!-- Suggestions -->
        <div class="px-4 pt-2 bg-gray-50 flex flex-wrap gap-2">
            {#each suggestions as suggestion}
                <button 
                    on:click={() => handleSend(suggestion)}
                    class="text-[10px] bg-white border border-violet-200 text-violet-600 px-2 py-1 rounded-full hover:bg-violet-50 transition-colors text-left"
                >
                    {suggestion}
                </button>
            {/each}
        </div>

        <!-- Input -->
        <div class="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input 
                bind:value={inputText}
                on:keydown={(e) => e.key === 'Enter' && handleSend()}
                type="text" 
                placeholder="Ask AI..." 
                class="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
            />
            <button 
                on:click={() => handleSend()}
                class="p-2 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-colors disabled:opacity-50"
                disabled={!inputText.trim()}
            >
                <PaperPlaneRight size={16} weight="bold" />
            </button>
        </div>
    </div>
    {/if}

    <!-- Toggle Button -->
    <button 
        on:click={toggleChat}
        class="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white p-4 rounded-full shadow-lg hover:shadow-violet-500/30 hover:scale-105 transition-all pointer-events-auto"
    >
        {#if isOpen}
            <X size={24} weight="bold" />
        {:else}
            <Robot size={24} weight="fill" />
        {/if}
    </button>
</div>