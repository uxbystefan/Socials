<script>
  import { createEventDispatcher } from 'svelte';
  import {
    Clock,
    Briefcase,
    Kanban,
    Users,
    ChatTeardropDots,
    Cube,
    ListChecks,
    Question,
    CalendarBlank
  } from 'phosphor-svelte';

  export let active = 'contacts';
  const dispatch = createEventDispatcher();

  function setActive(view) {
    dispatch('navigate', view);
  }
</script>

<aside class="flex flex-col h-full w-20 bg-white border-r border-gray-100 items-center py-6 gap-8">
  <!-- Logo -->
  <div class="h-10 w-10 bg-brand-blue rounded-xl flex items-center justify-center text-white font-bold text-xl">
    C
  </div>

  <!-- Navigation -->
  <nav class="flex-1 flex flex-col gap-6 w-full items-center">
    
    <button class="p-2 rounded-xl text-gray-400 hover:bg-gray-50">
      <Clock size={24} />
    </button>
    
    <button class="p-2 rounded-xl text-gray-400 hover:bg-gray-50">
      <Briefcase size={24} />
    </button>
    
    <!-- Kanban View -->
    <div class="relative w-full flex justify-center">
        {#if active === 'kanban'}
        <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand-blue rounded-r-lg"></div>
        {/if}
        <button 
            class="p-2 rounded-xl {active === 'kanban' ? 'text-brand-blue bg-blue-50' : 'text-gray-400 hover:bg-gray-50'}"
            on:click={() => setActive('kanban')}
        >
            <Kanban size={24} weight={active === 'kanban' ? 'fill' : 'regular'} />
        </button>
    </div>

    <!-- Calendar View -->
    <div class="relative w-full flex justify-center">
        {#if active === 'calendar'}
        <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand-blue rounded-r-lg"></div>
        {/if}
        <button 
            class="p-2 rounded-xl {active === 'calendar' ? 'text-brand-blue bg-blue-50' : 'text-gray-400 hover:bg-gray-50'}"
            on:click={() => setActive('calendar')}
        >
            <CalendarBlank size={24} weight={active === 'calendar' ? 'fill' : 'regular'} />
        </button>
    </div>

    <!-- Contacts View -->
    <div class="relative w-full flex justify-center">
        {#if active === 'contacts'}
        <div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-brand-blue rounded-r-lg"></div>
        {/if}
        <button 
            class="p-2 rounded-xl {active === 'contacts' ? 'text-brand-blue bg-blue-50' : 'text-gray-400 hover:bg-gray-50'}"
            on:click={() => setActive('contacts')}
        >
            <Users size={24} weight={active === 'contacts' ? 'fill' : 'regular'} />
        </button>
    </div>

    <button class="p-2 rounded-xl text-gray-400 hover:bg-gray-50">
      <ChatTeardropDots size={24} />
    </button>
    
    <button class="p-2 rounded-xl text-gray-400 hover:bg-gray-50">
      <Cube size={24} />
    </button>
    
    <button class="p-2 rounded-xl text-gray-400 hover:bg-gray-50">
      <ListChecks size={24} />
    </button>

  </nav>

  <!-- Bottom -->
  <div class="flex flex-col gap-6 items-center">
    <button class="p-2 rounded-xl text-gray-400 hover:bg-gray-50">
        <Question size={24} />
    </button>
    
    <div class="h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
        <img src="https://i.pravatar.cc/100?img=11" alt="User" />
    </div>
  </div>
</aside>
