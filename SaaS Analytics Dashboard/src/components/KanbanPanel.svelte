<script>
  import { onMount } from 'svelte';
  import { CaretDown } from 'phosphor-svelte';
  import Chart from 'chart.js/auto';

  let chartCanvas;

  onMount(() => {
    const ctx = chartCanvas.getContext('2d');
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(79, 70, 229, 0.2)'); // Brand blue low opacity
    gradient.addColorStop(1, 'rgba(79, 70, 229, 0)');

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          data: [1000, 1500, 1200, 1800, 2400, 2100, 2300],
          borderColor: '#4F46E5',
          backgroundColor: gradient,
          borderWidth: 2,
          tension: 0.4, // Smooths the line
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
        },
        scales: {
            x: { display: false },
            y: { display: false, min: 500 }
        },
        maintainAspectRatio: false
      }
    });

    return () => chart.destroy();
  });
</script>

<div class="w-80 bg-white border-r border-gray-100 flex flex-col h-full overflow-y-auto">
  <!-- Header (Same as Contact Sidebar) -->
  <div class="p-6 border-b border-gray-50">
    <button class="flex items-center gap-3 w-full hover:bg-gray-50 p-2 -ml-2 rounded-lg transition-colors">
      <div class="h-10 w-10 bg-brand-blue rounded-full flex items-center justify-center text-white font-bold text-lg">
        C
      </div>
      <div class="text-left flex-1">
        <h2 class="font-bold text-gray-900 leading-tight">CRAFTUI LLC</h2>
        <p class="text-xs text-gray-400">8484 Ross Wells</p>
      </div>
      <CaretDown size={16} class="text-gray-400" />
    </button>
  </div>

  <div class="p-6 flex-1 flex flex-col gap-8">
    
    <!-- Tasks Overview -->
    <div>
      <h3 class="font-semibold text-gray-900">Tasks overview</h3>
      <p class="text-xs text-gray-400 mt-1">Overall tasks performance</p>
      
      <div class="mt-8 flex flex-col gap-6">
        
        <!-- Stat Item 1: To do -->
        <div>
           <div class="flex justify-between items-end mb-2">
               <div>
                   <div class="text-xs text-gray-400 font-medium mb-1">To do</div>
                   <div class="text-xl font-bold text-gray-900">1.345</div>
               </div>
               <div class="text-xs font-bold text-gray-400">75%</div>
           </div>
           <div class="w-full bg-gray-100 rounded-full h-1.5">
               <div class="bg-emerald-400 h-1.5 rounded-full" style="width: 75%"></div>
           </div>
        </div>

        <!-- Stat Item 2: Pending -->
        <div>
            <div class="flex justify-between items-end mb-2">
                <div>
                    <div class="text-xs text-gray-400 font-medium mb-1">Pending</div>
                    <div class="text-xl font-bold text-gray-900">840</div>
                </div>
                <div class="text-xs font-bold text-gray-400">30%</div>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-1.5">
                <div class="bg-amber-400 h-1.5 rounded-full" style="width: 30%"></div>
            </div>
         </div>

        <!-- Stat Item 3: Done -->
        <div>
            <div class="flex justify-between items-end mb-2">
                <div>
                    <div class="text-xs text-gray-400 font-medium mb-1">Done</div>
                    <div class="text-xl font-bold text-gray-900">1.084</div>
                </div>
                <div class="text-xs font-bold text-gray-400">80%</div>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-1.5">
                <div class="bg-brand-blue h-1.5 rounded-full" style="width: 80%"></div>
            </div>
         </div>

      </div>
    </div>

    <!-- Conversion History -->
    <div class="flex-1 min-h-[150px] flex flex-col">
      <h3 class="font-semibold text-gray-900">Conversion history</h3>
      <p class="text-xs text-gray-400 mt-1">Week to week performance</p>

      <div class="relative mt-4 flex-1 w-full h-32">
        <canvas bind:this={chartCanvas}></canvas>
      </div>
    </div>
  </div>

  <!-- Footer Stats -->
  <div class="p-6 border-t border-gray-50 grid grid-cols-2 gap-4">
    <div>
        <div class="text-lg font-bold text-gray-900">$342.000</div>
        <div class="text-xs text-gray-500">Total sales</div>
    </div>
    <div>
        <div class="text-lg font-bold text-gray-900">$200.000</div>
        <div class="text-xs text-gray-500">Spendings</div>
    </div>
  </div>
</div>
