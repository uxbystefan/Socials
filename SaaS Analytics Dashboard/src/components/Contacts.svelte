<script>
  import {
    List,
    MagnifyingGlass,
    PlusCircle,
    GearSix,
    ListDashes,
    SquaresFour,
    Funnel,
    CaretDown,
    DotsThree,
    ArrowsDownUp,
  } from 'phosphor-svelte';
  import AIAgent from './AIAgent.svelte';

  const contacts = [
    { id: 1, name: 'Nicholas Gordon', role: 'Developer', email: 'ernest.mason@gmail.com', phone: '561-303-6106', rate: '$17/ hr', tag: 'Developer', avatar: 'https://i.pravatar.cc/100?img=12' },
    { id: 2, name: 'Bradley Malone', role: 'Manager', email: 'bradley.m@gmail.com', phone: '242-576-7666', rate: '$15/ hr', tag: 'Manager', avatar: 'https://i.pravatar.cc/100?img=13' },
    { id: 3, name: 'Janie Todd', role: 'Designer', email: 'stroman.hanna@yahoo.com', phone: '467-624-8505', rate: '$16/ hr', tag: 'Designer', avatar: 'https://i.pravatar.cc/100?img=14' },
    { id: 4, name: 'Marvin Lambert', role: 'Developer', email: 'micaela.okuneva@zemlak.biz', phone: '716-937-5782', rate: '$19/ hr', tag: 'Developer', avatar: 'https://i.pravatar.cc/100?img=3' },
    { id: 5, name: 'Teresa Lloyd', role: 'Designer', email: 'carlee_erdman@gmail.com', phone: '496-144-8261', rate: '$13/ hr', tag: 'Designer', avatar: 'https://i.pravatar.cc/100?img=16' },
    { id: 6, name: 'Fred Haynes', role: 'Manager', email: 'jarod.miller@hotmail.com', phone: '305-305-1123', rate: '$17/ hr', tag: 'Manager', avatar: 'https://i.pravatar.cc/100?img=17' },
    { id: 7, name: 'Rose Peters', role: 'Designer', email: 'oma.russel@hotmail.com', phone: '828-963-3958', rate: '$15/ hr', tag: 'Designer', avatar: 'https://i.pravatar.cc/100?img=18' },
  ];

  let view = 'list';
</script>

<div class="flex-1 flex flex-col h-full bg-gray-50 overflow-hidden">
  
  <!-- Top Header -->
  <header class="flex items-center justify-between px-8 py-6">
    <div class="flex items-center gap-4">
      <button class="p-2 bg-white rounded-lg text-gray-400 hover:text-gray-600 shadow-sm">
        <List size={20} />
      </button>
      <h1 class="text-2xl font-bold text-gray-900">Contacts</h1>
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

  <!-- Main Content Card -->
  <div class="flex-1 px-8 pb-8 overflow-hidden flex flex-col">
    <div class="bg-white rounded-3xl shadow-sm flex flex-col flex-1 overflow-hidden">
      
      <!-- Toolbox -->
      <div class="flex items-center justify-between p-6 border-b border-gray-100">
        <div class="flex bg-blue-50 rounded-lg p-1">
          <button 
            class="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-colors {view === 'list' ? 'bg-brand-blue text-white shadow-sm' : 'text-brand-blue hover:bg-white/50'}"
            on:click={() => view = 'list'}
          >
            <ListDashes size={18} weight="bold" />
            LIST
          </button>
          <button 
            class="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-colors {view === 'grid' ? 'bg-brand-blue text-white shadow-sm' : 'text-brand-blue hover:bg-white/50'}"
            on:click={() => view = 'grid'}
          >
            <SquaresFour size={18} weight="bold" />
            GRID
          </button>
        </div>

        <button class="flex items-center gap-2 text-gray-500 font-medium text-sm hover:text-gray-700">
          <Funnel size={18} />
          SORT: A-Z
          <CaretDown size={14} />
        </button>
      </div>

      <!-- Content Area (List or Grid) -->
      {#if view === 'list'}
        <!-- Table Header -->
        <div class="grid grid-cols-[2fr_2fr_1.5fr_1fr_1fr_0.5fr] gap-4 px-8 py-4 border-b border-gray-100 bg-gray-50/50 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <div class="flex items-center gap-2 cursor-pointer hover:text-gray-600">Name <ArrowsDownUp size={14} /></div>
            <div class="flex items-center gap-2 cursor-pointer hover:text-gray-600">Email <ArrowsDownUp size={14} /></div>
            <div class="flex items-center gap-2 cursor-pointer hover:text-gray-600">Phone <ArrowsDownUp size={14} /></div>
            <div class="flex items-center gap-2 cursor-pointer hover:text-gray-600">Rate <ArrowsDownUp size={14} /></div>
            <div class="flex items-center gap-2 cursor-pointer hover:text-gray-600">Tag <ArrowsDownUp size={14} /></div>
            <div></div>
        </div>

        <!-- Table Body -->
        <div class="overflow-y-auto flex-1">
            {#each contacts as contact}
            <div class="grid grid-cols-[2fr_2fr_1.5fr_1fr_1fr_0.5fr] gap-4 px-8 py-4 items-center border-b border-gray-50 hover:bg-gray-50 transition-colors group">
                
                <!-- Name -->
                <div class="flex items-center gap-4">
                <div class="relative">
                    <img src={contact.avatar} alt={contact.name} class="w-10 h-10 rounded-full object-cover shadow-sm" />
                    <div class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
                <div>
                    <div class="font-bold text-gray-900">{contact.name}</div>
                    <div class="text-xs text-gray-400">{contact.role}</div>
                </div>
                </div>

                <!-- Email -->
                <div>
                <div class="font-medium text-gray-900 truncate">{contact.email}</div>
                <div class="text-xs text-gray-400">Email</div>
                </div>

                <!-- Phone -->
                <div>
                    <div class="font-medium text-gray-900">{contact.phone}</div>
                    <div class="text-xs text-gray-400">Phone</div>
                </div>

                <!-- Rate -->
                <div>
                    <div class="font-bold text-gray-900">{contact.rate}</div>
                    <div class="text-xs text-gray-400">Rate</div>
                </div>

                <!-- Tag -->
                <div>
                <span class="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-semibold">
                    {contact.tag}
                </span>
                </div>

                <!-- Menu -->
                <div class="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <button class="p-2 hover:bg-gray-200 rounded-lg text-gray-400">
                        <DotsThree size={24} weight="bold" />
                    </button>
                </div>

            </div>
            {/each}
        </div>
      {:else}
        <!-- Grid View -->
        <div class="overflow-y-auto flex-1 p-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {#each contacts as contact}
                <div class="bg-white border boundary-gray-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow relative group">
                    <button class="absolute top-4 right-4 text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <DotsThree size={24} weight="bold" />
                    </button>
                    
                    <div class="relative mb-4">
                        <img src={contact.avatar} alt={contact.name} class="w-20 h-20 rounded-full object-cover shadow-md" />
                        <div class="absolute bottom-1 right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                    </div>
                    
                    <h3 class="font-bold text-gray-900 text-lg">{contact.name}</h3>
                    <p class="text-sm text-gray-400 mb-4">{contact.role}</p>
                    
                    <div class="w-full space-y-3">
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-gray-400">Rate</span>
                            <span class="font-bold text-gray-900">{contact.rate}</span>
                        </div>
                        <div class="flex items-center justify-between text-sm">
                            <span class="text-gray-400">Tag</span>
                            <span class="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-semibold">{contact.tag}</span>
                        </div>
                    </div>

                    <div class="border-t border-gray-100 w-full mt-4 pt-4 flex justify-between gap-2">
                         <button class="flex-1 py-2 text-sm font-semibold text-brand-blue bg-blue-50 rounded-lg hover:bg-blue-100">Profile</button>
                         <button class="flex-1 py-2 text-sm font-semibold text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100">Message</button>
                    </div>
                </div>
                {/each}
            </div>
        </div>
      {/if}

      <!-- Pagination -->
      <div class="p-4 border-t border-gray-100 flex items-center justify-between">
         <button class="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors">
            <CaretDown size={14} class="rotate-90" />
            Prev
         </button>
         
         <div class="flex items-center gap-2">
            <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm border border-gray-200 text-xs font-bold text-gray-900">1</button>
            <button class="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold text-gray-400 hover:bg-gray-50">2</button>
            <button class="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold text-gray-400 hover:bg-gray-50">3</button>
            <button class="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold text-gray-400 hover:bg-gray-50">4</button>
            <button class="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold text-gray-400 hover:bg-gray-50">5</button>
         </div>

         <button class="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-lg text-xs font-bold uppercase tracking-wide transition-colors">
            Next
            <CaretDown size={14} class="-rotate-90" />
         </button>
      </div>

    </div>
  </div>

  <AIAgent context="contacts" data={contacts} />
</div>
