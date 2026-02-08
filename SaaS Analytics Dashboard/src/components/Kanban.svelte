<script>
  import {
    List,
    MagnifyingGlass,
    PlusCircle,
    GearSix,
    DotsThree,
    Plus,
    Chat,
    Paperclip,
    Trash, // Added Trash icon
    X, // Added Close icon
  } from 'phosphor-svelte';
  import AIAgent from './AIAgent.svelte';

  let tasks = [
    {
      id: 1,
      title: 'Design new UI presentation',
      category: 'Dribbble Presentation',
      status: 'todo',
      progress: 7,
      total: 14,
      date: '24 Aug 2026',
      comments: 4,
      attachments: 1,
      color: 'amber', // Orange/Yellow
      avatars: []
    },
    {
      id: 2,
      title: 'Add more UI/UX mockups',
      category: 'Pinterest Promotion',
      status: 'todo',
      progress: 8,
      total: 16,
      date: '14 Mar 2026',
      comments: 0,
      attachments: 0,
      color: 'amber',
      avatars: ['https://i.pravatar.cc/100?img=33', 'https://i.pravatar.cc/100?img=47']
    },
    {
      id: 3,
      title: 'Design few mobile screens',
      category: 'Dropbox Mobile App',
      status: 'todo',
      progress: 3,
      total: 14,
      date: '14 Jan 2026',
      comments: 0,
      attachments: 0,
      color: 'rose', // Red/Pink
      avatars: []
    },
    {
      id: 4,
      title: 'Create a new wireframe',
      category: 'Website Development',
      status: 'inprogress',
      progress: 6,
      total: 12,
      date: '27 May 2026',
      comments: 0,
      attachments: 0,
      color: 'amber',
      avatars: ['https://i.pravatar.cc/100?img=10', 'https://i.pravatar.cc/100?img=12']
    },
    {
      id: 5,
      title: 'Create a twit and promote',
      category: 'Twitter Marketing',
      status: 'inprogress',
      progress: 4,
      total: 8,
      date: '04 Aug 2026',
      comments: 4,
      attachments: 1,
      color: 'rose', 
      avatars: []
    },
    {
      id: 6,
      title: 'Add product to the market',
      category: 'Envato App Design',
      status: 'done',
      progress: 4,
      total: 4,
      date: '21 Aug 2026',
      comments: 0,
      attachments: 0,
      color: 'emerald',
      avatars: ['https://i.pravatar.cc/100?img=5', 'https://i.pravatar.cc/100?img=8']
    },
    {
      id: 7,
      title: 'Run and manage campaign',
      category: 'Adwords Campaign',
      status: 'done',
      progress: 6,
      total: 6,
      date: '27 Nov 2026',
      comments: 4,
      attachments: 1,
      color: 'emerald',
      avatars: []
    },
    {
      id: 8,
      title: 'Launch product promotion',
      category: 'Kickstarter Campaign',
      status: 'done',
      progress: 7,
      total: 8,
      date: '07 Sep 2026',
      comments: 4,
      attachments: 1,
      color: 'emerald', // Green
      avatars: []
    }
  ];

  const columns = [
    { id: 'todo', label: 'To do' },
    { id: 'inprogress', label: 'In progress' },
    { id: 'done', label: 'Done' }
  ];

  // Helper to map color names to tailwind classes
  function getColorClass(color) {
      if (color === 'amber') return 'bg-amber-400';
      if (color === 'rose') return 'bg-rose-400';
      if (color === 'emerald') return 'bg-emerald-400';
      return 'bg-gray-400';
  }

  // --- Drag and Drop Logic ---
  let draggedTask = null;

  function handleDragStart(event, task) {
    draggedTask = task;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', JSON.stringify(task));
    // Add a ghost class or just opacity
    event.target.style.opacity = '0.5';
  }

  function handleDragEnd(event) {
    draggedTask = null;
    event.target.style.opacity = '1';
  }

  function handleDragOver(event) {
    event.preventDefault(); // Necessary to allow dropping
    event.dataTransfer.dropEffect = 'move';
  }

  function handleDrop(event, status) {
    event.preventDefault();
    if (!draggedTask) return;

    // Remove from old list and add to new with updated status
    // Or just update the status property
    tasks = tasks.map(t => {
        if (t.id === draggedTask.id) {
            return { ...t, status: status };
        }
        return t;
    });
    
    draggedTask = null;
  }

  // --- Delete Logic ---
  let confirmDeleteId = null;

  function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    confirmDeleteId = null;
  }

  // --- Add Task Logic ---
  let isAddModalOpen = false;
  let newTaskTitle = '';
  let newTaskCategory = '';
  let newTaskColumn = 'todo';

  function openAddTask(columnId) {
    newTaskColumn = columnId;
    isAddModalOpen = true;
  }

  function closeAddTask() {
    isAddModalOpen = false;
    newTaskTitle = '';
    newTaskCategory = '';
  }

  function saveNewTask() {
    if (!newTaskTitle) return;

    const newId = Math.max(...tasks.map(t => t.id), 0) + 1;
    const task = {
        id: newId,
        title: newTaskTitle,
        category: newTaskCategory || 'General',
        status: newTaskColumn,
        progress: 0,
        total: 5, // Default
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        comments: 0,
        attachments: 0,
        color: 'amber',
        avatars: []
    };

    tasks = [...tasks, task]; // Svelte reactivity
    closeAddTask();
  }

</script>

<div class="flex-1 flex flex-col h-full bg-gray-50 overflow-hidden">
  
  <!-- Top Header -->
  <header class="flex items-center justify-between px-8 py-6">
    <div class="flex items-center gap-4">
      <button class="p-2 bg-white rounded-lg text-gray-400 hover:text-gray-600 shadow-sm">
        <List size={20} />
      </button>
      <h1 class="text-2xl font-bold text-gray-900">Kanban Desk</h1>
    </div>
    
    <div class="flex items-center gap-4">
      <div class="relative">
        <MagnifyingGlass size={20} class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input 
          type="text" 
          placeholder="" 
          class="pl-10 pr-4 py-2 w-10 bg-transparent focus:w-64 transition-all duration-300 outline-none border-b border-transparent focus:border-gray-300 text-gray-600"
        />
      </div>
      <button class="text-gray-400 hover:text-gray-600">
        <PlusCircle size={24} />
      </button>
      <button class="text-gray-400 hover:text-gray-600">
        <GearSix size={24} />
      </button>
    </div>
  </header>

  <!-- Kanban Board -->
  <div class="flex-1 px-8 pb-8 overflow-x-auto overflow-y-hidden">
    <div class="flex h-full gap-8 min-w-[1000px]">
        
        {#each columns as column}
            <!-- Column -->
            <div 
                class="flex-1 flex flex-col h-full bg-gray-100/50 rounded-2xl p-2 transition-colors hover:bg-gray-100"
                on:dragover={handleDragOver}
                on:drop={(e) => handleDrop(e, column.id)}
                role="list"
                aria-label="{column.label} column"
            >
                <!-- Column Header -->
                 <div class="flex items-center justify-between mb-4 px-2 pt-2">
                    <h3 class="text-gray-500 font-bold text-sm tracking-wide">{column.label}</h3>
                    <button 
                        class="flex items-center gap-1 text-[10px] font-bold text-gray-500 hover:text-brand-blue bg-white hover:bg-blue-50 border border-gray-200 rounded-lg px-2 py-1 transition-all uppercase shadow-sm"
                        on:click={() => openAddTask(column.id)}
                    >
                        <PlusCircle size={14} weight="bold" />
                        Add
                    </button>
                 </div>

                 <!-- Cards Container -->
                 <div class="flex-1 overflow-y-auto pr-1 pb-4 flex flex-col gap-3">
                    {#each tasks.filter(t => t.status === column.id) as task (task.id)}
                        <div 
                            class="bg-white p-5 rounded-2xl shadow-sm hover:shadow-lg transition-all cursor-move group relative border border-gray-100"
                            draggable="true"
                            on:dragstart={(e) => handleDragStart(e, task)}
                            on:dragend={handleDragEnd}
                            role="listitem"
                        >
                            
                            <!-- Card Header -->
                            <div class="flex justify-between items-start mb-2 relative">
                                <h4 class="font-bold text-gray-900 leading-snug w-5/6 text-sm">{task.title}</h4>
                                <div class="relative">
                                    <button 
                                        class="text-gray-300 hover:text-red-500 p-1 rounded-md hover:bg-red-50 transition-colors {confirmDeleteId === task.id ? 'opacity-100 text-red-500 bg-red-50' : 'opacity-0 group-hover:opacity-100'}"
                                        on:click|stopPropagation={() => confirmDeleteId = (confirmDeleteId === task.id ? null : task.id)}
                                        title="Delete Task"
                                    >
                                        <Trash size={16} weight="bold" />
                                    </button>
                                    
                                    {#if confirmDeleteId === task.id}
                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                                    <div 
                                        class="absolute right-0 top-full mt-2 z-50 bg-white shadow-xl border border-red-100 p-3 rounded-xl w-48 text-center" 
                                        on:click|stopPropagation
                                    >
                                        <p class="text-[10px] font-bold text-gray-600 mb-2">Delete this task?</p>
                                        <div class="flex gap-2 justify-center">
                                            <button 
                                                class="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-semibold text-gray-600 transition-colors" 
                                                on:click|stopPropagation={() => confirmDeleteId = null}
                                            >
                                                No
                                            </button>
                                            <button 
                                                class="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-xs font-semibold text-white transition-colors" 
                                                on:click|stopPropagation={() => deleteTask(task.id)}
                                            >
                                                Yes
                                            </button>
                                        </div>
                                        <!-- Arrow -->
                                        <div class="absolute -top-1.5 right-2 w-3 h-3 bg-white border-t border-l border-red-100 transform rotate-45"></div>
                                    </div>
                                    {/if}
                                </div>
                            </div>
                            <div class="text-[10px] font-semibold text-gray-400 mb-4 bg-gray-50 inline-block px-2 py-1 rounded-md">{task.category}</div>

                            <!-- Progress -->
                            <div class="flex items-center gap-3 mb-4">
                                <div class="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div class="{getColorClass(task.color)} h-full rounded-full" style="width: {(task.progress / task.total) * 100}%"></div>
                                </div>
                                <div class="text-[10px] font-bold text-gray-400">{task.progress}/{task.total}</div>
                            </div>
                            
                            <!-- Card Footer -->
                            <div class="flex items-center justify-between mt-auto">
                                <!-- Date -->
                                <div class="text-gray-400 text-[10px] font-bold">
                                    {task.date}
                                </div>

                                <!-- Meta & Avatars -->
                                <div class="flex items-center gap-3">
                                    {#if task.comments > 0 || task.attachments > 0}
                                        <div class="flex items-center gap-2 text-gray-400 text-xs font-bold">
                                            {#if task.comments > 0}
                                            <div class="flex items-center gap-1 hover:text-brand-blue">
                                                <Chat size={14} weight="fill" /> {task.comments}
                                            </div>
                                            {/if}
                                            {#if task.attachments > 0}
                                            <div class="flex items-center gap-1 hover:text-brand-blue">
                                                <Paperclip size={14} weight="bold" /> {task.attachments}
                                            </div>
                                            {/if}
                                        </div>
                                    {/if}

                                    {#if task.avatars.length > 0}
                                        <div class="flex -space-x-2">
                                            {#each task.avatars as avatar}
                                                <img src={avatar} alt="Avatar" class="w-6 h-6 rounded-full border-2 border-white object-cover" />
                                            {/each}
                                        </div>
                                    {:else}
                                         <div class="w-6 h-6 rounded-full border-2 border-white bg-gray-50 text-gray-300 flex items-center justify-center text-[8px] font-bold">
                                            <Plus size={10} weight="bold"/>
                                         </div>
                                    {/if}
                                </div>
                            </div>

                        </div>
                    {/each}
                 </div>
            </div>
        {/each}

    </div>
  </div>

  <!-- Add Task Modal -->
  {#if isAddModalOpen}
  <div class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div class="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl" role="document">
          <div class="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 class="font-bold text-gray-900">Add New Task</h3>
              <button on:click={closeAddTask} class="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100" aria-label="Close modal">
                  <X size={20} />
              </button>
          </div>
          <div class="p-6 flex flex-col gap-4">
              <div>
                  <label for="new-task-title" class="block text-xs font-bold text-gray-700 mb-1">Title</label>
                  <input id="new-task-title" bind:value={newTaskTitle} type="text" class="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue" placeholder="Enter task title..." />
              </div>
              <div>
                  <label for="new-task-category" class="block text-xs font-bold text-gray-700 mb-1">Category</label>
                  <input id="new-task-category" bind:value={newTaskCategory} type="text" class="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue" placeholder="Project name..." />
              </div>
              <div>
                  <label for="new-task-status" class="block text-xs font-bold text-gray-700 mb-1">Status</label>
                  <select id="new-task-status" bind:value={newTaskColumn} class="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue bg-white">
                      {#each columns as col}
                        <option value={col.id}>{col.label}</option>
                      {/each}
                  </select>
              </div>
          </div>
          <div class="p-4 bg-gray-50 flex justify-end gap-3">
              <button on:click={closeAddTask} class="px-4 py-2 rounded-xl text-sm font-semibold text-gray-500 hover:bg-white hover:text-gray-700 transition-colors">Cancel</button>
              <button on:click={saveNewTask} class="px-4 py-2 rounded-xl text-sm font-semibold bg-brand-blue text-white hover:opacity-90 transition-opacity">Create Task</button>
          </div>
      </div>
  </div>
  {/if}

  <AIAgent context="kanban" data={tasks} />

</div>
