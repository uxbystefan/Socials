<script>
  import Sidebar from './components/Sidebar.svelte';
  import ContactsPanel from './components/ContactsPanel.svelte';
  import Contacts from './components/Contacts.svelte'; // This is the Contacts List
  
  import KanbanPanel from './components/KanbanPanel.svelte';
  import Kanban from './components/Kanban.svelte';

  import CalendarPanel from './components/CalendarPanel.svelte';
  import Calendar from './components/Calendar.svelte';

  let activeView = 'kanban'; // Default to Kanban as per request, or 'contacts'

  function handleNavigate(event) {
    activeView = event.detail;
  }
</script>

<main class="flex h-screen w-full bg-gray-50 font-sans overflow-hidden">
  <Sidebar active={activeView} on:navigate={handleNavigate} />
  
  {#if activeView === 'contacts'}
      <ContactsPanel />
      <Contacts />
  {:else if activeView === 'kanban'}
      <KanbanPanel />
      <Kanban />
  {:else if activeView === 'calendar'}
      <CalendarPanel />
      <Calendar />
  {/if}
</main>
