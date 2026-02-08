<script>
  import { MagnifyingGlass, Plus, CaretLeft, CaretRight, List, X, Trash } from 'phosphor-svelte';
  import AIAgent from './AIAgent.svelte';

  let currentView = 'Month';
  let currentDate = 'September 2026';

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // 5 rows of 7 days
  let calendarDays = [
    { day: 26, currentMonth: false, events: [{ title: 'Meeting', time: '10:00-11:00', type: 'blue' }] },
    { day: 27, currentMonth: false },
    { day: 28, currentMonth: false },
    { day: 29, currentMonth: false, events: [{ title: 'Design new pages', time: '10:00-11:00', type: 'green' }] },
    { day: 30, currentMonth: false },
    { day: 1, currentMonth: true },
    { day: 2, currentMonth: true },
    
    { day: 3, currentMonth: true },
    { day: 4, currentMonth: true, events: [{ title: 'Type to add ...', time: '10:00-11:00', type: 'gray-input' }] },
    { day: 5, currentMonth: true },
    { day: 6, currentMonth: true },
    { day: 7, currentMonth: true },
    { day: 8, currentMonth: true, events: [{ title: 'Visit course', time: '10:00-11:00', type: 'red' }] },
    { day: 9, currentMonth: true },

    { day: 10, currentMonth: true },
    { day: 11, currentMonth: true },
    { day: 12, currentMonth: true, events: [{ title: 'Design new UI and check sales', time: '9:00-13:00', type: 'yellow' }] },
    { day: 13, currentMonth: true },
    { day: 14, currentMonth: true },
    { day: 15, currentMonth: true },
    { day: 16, currentMonth: true },
    
    { day: 17, currentMonth: true },
    { day: 18, currentMonth: true },
    { day: 19, currentMonth: true },
    { day: 20, currentMonth: true },
    { day: 21, currentMonth: true, events: [{ title: 'Visit course', time: '10:00-11:00', type: 'red' }] },
    { day: 22, currentMonth: true },
    { day: 23, currentMonth: true },

    { day: 24, currentMonth: true },
    { day: 25, currentMonth: true, events: [{ title: 'Meeting', time: '10:00-11:00', type: 'blue' }] },
    { day: 26, currentMonth: true },
    { day: 27, currentMonth: true },
    { day: 28, currentMonth: true },
    { day: 29, currentMonth: true },
    { day: 30, currentMonth: true },
  ];

  function getEventColor(type) {
    switch(type) {
        case 'blue': return 'bg-blue-100 text-blue-600';
        case 'green': return 'bg-green-50 text-green-500'; // Using lighter greens as per image
        case 'red': return 'bg-red-50 text-red-500';
        case 'yellow': return 'bg-orange-50 text-orange-500'; // looks more orange-yellow
        case 'gray-input': return 'bg-gray-100 text-gray-500 italic';
        default: return 'bg-gray-100 text-gray-600';
    }
  }

  // --- Add Event Logic ---
  let isEventModalOpen = false;
  let newEventTitle = '';
  let newEventTime = '09:00-10:00';
  let newEventType = 'blue';
  let targetDayIndex = -1;

  function openEventModal(index) {
    targetDayIndex = index;
    isEventModalOpen = true;
  }

  function closeEventModal() {
    isEventModalOpen = false;
    newEventTitle = '';
    targetDayIndex = -1;
  }

  function saveEvent() {
    if(!newEventTitle || targetDayIndex === -1) return;

    const updatedDays = [...calendarDays];
    const day = updatedDays[targetDayIndex];
    
    if(!day.events) day.events = [];
    day.events.push({
        title: newEventTitle,
        time: newEventTime,
        type: newEventType
    });

    calendarDays = updatedDays;
    closeEventModal();
  }

  let confirmDeleteEventKey = null;

  function deleteEvent(dayIndex, eventIndex) {
      const updatedDays = [...calendarDays];
      updatedDays[dayIndex].events.splice(eventIndex, 1);
      calendarDays = updatedDays;
      confirmDeleteEventKey = null;
  }
</script>

<div class="flex-1 flex flex-col h-full bg-white overflow-hidden p-8">
  <!-- Top Bar -->
  <header class="flex items-center justify-between mb-8">
    <div class="flex items-center gap-4">
        <button class="p-2 bg-gray-50 rounded-lg lg:hidden">
            <List size={20} />
        </button>
        <h1 class="text-2xl font-bold text-gray-900">Calendar</h1>
    </div>

    <div class="flex items-center gap-3">
        <button class="p-2 text-gray-400 hover:bg-gray-50 rounded-xl">
            <MagnifyingGlass size={20} />
        </button>
        <button class="p-2 bg-gray-50 text-gray-400 rounded-xl hover:bg-gray-100">
            <Plus size={20} />
        </button>
    </div>
  </header>

  <!-- Navigation Bar -->
  <div class="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
    <!-- View Switcher -->
    <div class="bg-gray-50 p-1 rounded-xl inline-flex">
        {#each ['Month', 'Week', 'Day'] as view}
            <button 
                class="px-4 py-2 rounded-lg text-sm font-medium transition-all {currentView === view ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-gray-600'}"
                on:click={() => currentView = view}
            >
                {view}
            </button>
        {/each}
    </div>

    <!-- Date Navigation -->
    <div class="flex items-center gap-8">
        <h2 class="text-xl font-bold text-gray-900">{currentDate}</h2>
        
        <div class="flex items-center gap-2">
            <button class="p-2 border border-gray-100 rounded-xl hover:bg-gray-50 text-gray-400">
                <CaretLeft size={20} />
            </button>
            <button class="p-2 border border-gray-100 rounded-xl hover:bg-gray-50 text-gray-400">
                <CaretRight size={20} />
            </button>
        </div>
    </div>

    <button class="text-sm font-medium text-gray-500 hover:text-gray-900">
        Today
    </button>
  </div>

  <!-- Calendar Grid -->
  <div class="flex-1 flex flex-col min-h-0 bg-white border border-gray-100 rounded-2xl overflow-hidden">
    <!-- Day Headers -->
    <div class="grid grid-cols-7 border-b border-gray-100 bg-gray-50/50">
        {#each daysOfWeek as day}
            <div class="py-4 text-center text-sm font-medium text-gray-400">
                {day}
            </div>
        {/each}
    </div>

    <!-- Days -->
    <div class="flex-1 grid grid-cols-7 grid-rows-5">
        {#each calendarDays as date, index}
            <div 
                class="border-r border-b border-gray-100 p-2 relative group hover:bg-gray-50/30 transition-colors min-h-[100px] cursor-pointer"
                on:click={() => openEventModal(index)}
                on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && openEventModal(index)}
                role="button"
                tabindex="0"
            >
                <span class="absolute top-2 right-3 text-sm font-medium {date.currentMonth ? 'text-gray-900' : 'text-gray-300'}">
                    {date.day}
                </span>

                {#if date.events}
                    <div class="flex flex-col gap-2 mt-6">
                        {#each date.events as event, eventIndex}
                            <div class="p-3 rounded-xl {getEventColor(event.type)} text-xs cursor-pointer hover:opacity-90 transition-opacity group/event relative">
                                <div class="font-bold mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis mr-4">{event.title}</div>
                                <div class="opacity-80 font-medium">{event.time}</div>
                                
                                <div class="absolute top-2 right-2">
                                    <button 
                                        class="p-1 rounded-md hover:bg-white/50 text-current transition-opacity {confirmDeleteEventKey === `${index}-${eventIndex}` ? 'opacity-100 bg-white/50' : 'opacity-0 group-hover/event:opacity-100'}"
                                        on:click|stopPropagation={() => confirmDeleteEventKey = (confirmDeleteEventKey === `${index}-${eventIndex}` ? null : `${index}-${eventIndex}`)}
                                        title="Delete event"
                                    >
                                        <Trash size={14} />
                                    </button>

                                    {#if confirmDeleteEventKey === `${index}-${eventIndex}`}
                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                                    <div 
                                        class="absolute right-0 top-full mt-2 z-50 bg-white shadow-xl border border-red-100 p-3 rounded-xl w-40 text-center cursor-default" 
                                        on:click|stopPropagation
                                    >
                                        <p class="text-[10px] font-bold text-gray-600 mb-2 whitespace-normal">Delete event?</p>
                                        <div class="flex gap-2 justify-center">
                                            <button 
                                                class="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-semibold text-gray-600 transition-colors" 
                                                on:click|stopPropagation={() => confirmDeleteEventKey = null}
                                            >
                                                No
                                            </button>
                                            <button 
                                                class="px-2 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-xs font-semibold text-white transition-colors" 
                                                on:click|stopPropagation={() => deleteEvent(index, eventIndex)}
                                            >
                                                Yes
                                            </button>
                                        </div>
                                    </div>
                                    {/if}
                                </div>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>
        {/each}
    </div>
  </div>
  
  <!-- Event Modal -->
  {#if isEventModalOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" on:click={closeEventModal}>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div 
            class="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl" 
            on:click|stopPropagation 
            role="document" 
            tabindex="-1"
      >
          <div class="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 class="font-bold text-gray-900">Add New Event</h3>
              <button on:click|stopPropagation={closeEventModal} class="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100">
                  <X size={20} />
              </button>
          </div>
          <div class="p-6 flex flex-col gap-4">
              <div>
                  <label for="event-title" class="block text-xs font-bold text-gray-700 mb-1">Event Title</label>
                  <input id="event-title" bind:value={newEventTitle} type="text" class="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue" placeholder="Meeting with..." />
              </div>
              <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label for="event-time" class="block text-xs font-bold text-gray-700 mb-1">Time</label>
                    <input id="event-time" bind:value={newEventTime} type="text" class="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue" placeholder="09:00-10:00" />
                  </div>
                  <div>
                    <label for="event-color" class="block text-xs font-bold text-gray-700 mb-1">Color</label>
                    <select id="event-color" bind:value={newEventType} class="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue bg-white">
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                        <option value="red">Red</option>
                        <option value="yellow">Yellow</option>
                    </select>
                  </div>
              </div>
          </div>
          <div class="p-4 bg-gray-50 flex justify-end gap-3">
              <button on:click|stopPropagation={closeEventModal} class="px-4 py-2 rounded-xl text-sm font-semibold text-gray-500 hover:bg-white hover:text-gray-700 transition-colors">Cancel</button>
              <button on:click|stopPropagation={saveEvent} class="px-4 py-2 rounded-xl text-sm font-semibold bg-brand-blue text-white hover:opacity-90 transition-opacity">Save Event</button>
          </div>
      </div>
  </div>
  {/if}

  <AIAgent context="calendar" data={calendarDays} />
</div>
