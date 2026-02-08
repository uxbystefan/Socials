<script>
  import { onMount } from 'svelte';
  import { CaretDown, DotsThree } from 'phosphor-svelte';
  import Chart from 'chart.js/auto';

  let chartCanvas;

  onMount(() => {
    const ctx = chartCanvas.getContext('2d');
    
    // Gradient for the bars
    const gradient = ctx.createLinearGradient(0, 0, 0, 100);
    gradient.addColorStop(0, '#4F46E5');
    gradient.addColorStop(1, '#818CF8');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [{
          label: 'Conversions',
          data: [25, 45, 30, 35, 60, 40, 50],
          backgroundColor: '#4F46E5', // simple color for now, gradient can be complex in svelte mount
          borderRadius: 4,
          barThickness: 6
        }, {
          label: 'Previous',
          data: [15, 30, 20, 25, 40, 25, 35],
          backgroundColor: '#E0E7FF',
          borderRadius: 4,
          barThickness: 6
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: { display: false } // Hide x labels to match clean look or keep them small
          },
          y: {
            display: false,
            grid: { display: false },
            border: { display: false }
          }
        },
        maintainAspectRatio: false
      }
    });
  });

  const events = [
    {
      time: '10:00-11:00',
      title: 'Meeting with a client',
      subtitle: 'Tell How To Boost Website Traffic',
      color: 'bg-blue-500',
      dotColor: 'text-blue-500'
    },
    {
        time: '12:00-14:00',
        title: 'Design new pages',
        subtitle: 'Design new pages for the website',
        color: 'bg-green-400', 
        dotColor: 'text-green-400'
    },
    {
        time: '9:00-13:00',
        title: 'Design new UI and check sales',
        subtitle: 'Find new pages and check analytics',
        color: 'bg-yellow-400',
        dotColor: 'text-yellow-400'
    },
    {
        time: '05:40-13:20',
        title: 'Visit online course',
        subtitle: 'Check updates about design course',
        color: 'bg-red-400',
        dotColor: 'text-red-400'
    }
  ];
</script>

<div class="w-80 bg-white border-r border-gray-100 hidden md:flex flex-col h-full overflow-y-auto flex-shrink-0">
  <!-- Header -->
  <div class="p-6 border-b border-gray-50 flex-shrink-0">
    <button class="flex items-center gap-3 w-full hover:bg-gray-50 p-2 -ml-2 rounded-lg transition-colors">
      <div class="h-10 w-10 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold text-lg">
        C
      </div>
      <div class="text-left flex-1 min-w-0">
        <h2 class="font-bold text-gray-900 leading-tight truncate">CRAFTUI LLC</h2>
        <p class="text-xs text-gray-400 truncate">8484 Ross Wells</p>
      </div>
      <CaretDown size={16} class="text-gray-400" />
    </button>
  </div>

  <div class="p-6 flex-1 flex flex-col min-h-0 overflow-y-auto">
    
    <!-- Upcoming Events -->
    <div class="mb-8">
      <h3 class="font-semibold text-gray-900">Upcoming events</h3>
      <p class="text-xs text-gray-400 mt-1">Don't miss scheduled events</p>
      
      <div class="mt-6 flex flex-col gap-4">
        {#each events as event}
          <div class="p-4 bg-gray-50 rounded-2xl relative group hover:bg-white hover:shadow-md transition-all">
            <!-- Time & Dot -->
            <div class="flex items-center gap-2 mb-1">
                <div class="w-2 h-2 rounded-full {event.color}"></div>
                <span class="{event.dotColor} text-xs font-semibold">{event.time}</span>
            </div>
            
            <div class="font-bold text-gray-900 text-sm">{event.title}</div>
            <div class="text-xs text-gray-400 mt-0.5">{event.subtitle}</div>

            <button class="absolute top-4 right-4 text-gray-300 hover:text-gray-500">
                <DotsThree size={24} weight="bold" />
            </button>
          </div>
        {/each}
      </div>
    </div>

    <!-- Conversion history chart -->
    <div class="mt-auto pt-6">
        <div class="bg-gray-50 p-6 rounded-3xl">
            <div class="flex items-center justify-between mb-4">
                <div>
                     <h3 class="font-bold text-gray-900">Conversion history</h3>
                     <p class="text-xs text-gray-400">Week to week performance</p>
                </div>
                <button class="p-2 bg-white rounded-xl shadow-sm hover:bg-gray-100">
                    <div class="w-5 h-5 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="text-gray-400">
                            <path d="M18 20V10M12 20V4M6 20V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </button>
            </div>
            <div class="h-32 w-full">
                 <canvas bind:this={chartCanvas}></canvas>
            </div>
        </div>
    </div>

  </div>
</div>
