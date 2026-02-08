<script>
  import { onMount } from 'svelte';
  import { CaretDown, UserGear, UserSwitch, User } from 'phosphor-svelte';
  import Chart from 'chart.js/auto';

  let chartCanvas;

  onMount(() => {
    const ctx = chartCanvas.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'Pending', 'Cancelled'],
        datasets: [{
          data: [65, 25, 10],
          backgroundColor: [
            '#4F46E5', // brand-blue
            '#E0E7FF', // lighter blue
            '#F3F4F6'  // gray
          ],
          borderWidth: 0,
          cutout: '80%',
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        }
      }
    });

    return () => chart.destroy();
  });
</script>

<div class="w-80 bg-white border-r border-gray-100 flex flex-col h-full overflow-y-auto">
  <!-- Header -->
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
    
    <!-- Contacts Overview -->
    <div>
      <h3 class="font-semibold text-gray-900">Contacts overview</h3>
      <p class="text-xs text-gray-400 mt-1">Your employees and clients details</p>
      
      <div class="mt-6 flex flex-col gap-4">
        
        <!-- Stat Item 1 -->
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
          <div>
            <div class="text-xl font-bold text-gray-900">1.345</div>
            <div class="text-xs text-gray-500 font-medium">Employees</div>
          </div>
          <div class="h-10 w-10 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center">
            <UserGear size={20} weight="fill" />
          </div>
        </div>

        <!-- Stat Item 2 -->
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div>
              <div class="text-xl font-bold text-gray-900">342</div>
              <div class="text-xs text-gray-500 font-medium">Partners</div>
            </div>
            <div class="h-10 w-10 rounded-full bg-yellow-50 text-yellow-500 flex items-center justify-center">
              <UserSwitch size={20} weight="fill" />
            </div>
        </div>

        <!-- Stat Item 3 -->
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div>
              <div class="text-xl font-bold text-gray-900">3.980</div>
              <div class="text-xs text-gray-500 font-medium">Customers</div>
            </div>
            <div class="h-10 w-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center">
              <User size={20} weight="fill" />
            </div>
        </div>

      </div>
    </div>

    <!-- Conversion History -->
    <div>
      <h3 class="font-semibold text-gray-900">Conversion history</h3>
      <p class="text-xs text-gray-400 mt-1">Week to week performance</p>

      <div class="relative mt-6 px-4">
        <canvas bind:this={chartCanvas}></canvas>
        <!-- Center Text -->
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div class="text-center">
            <div class="text-2xl font-bold text-gray-900">$85k</div>
          </div>
        </div>
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
