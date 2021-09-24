<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center">
      <h1 class="text-2xl font-semibold text-gray-900">Jobs Dashboard</h1>
    </div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      
      <!-- Replace with your content -->
      <div class="py-4">
        <Stats />

        <div class="relative py-4">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-300" />
          </div>
        </div>

        <div class="flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Job Name &nbsp; 
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Alert Type
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quality Check
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Updated
                      </th>
                      <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <span class="">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(job) in sortedJob" :key="job.id">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex flex-col items-start">
                          <div class="ml-0">
                            <div class="text-sm font-medium text-gray-900">
                              {{ job.name }} 
                            </div>
                            <div class="text-sm text-gray-500">
                              {{ job.email }}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ job.alertType }}</div>
                        <div class="text-sm text-gray-500">Group: {{ job.groupName }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ job.qualityCheck }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {{ job.status }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ job.lastUpdated }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <div class="flex items-center justify-evenly">
                          <button type="button" @click="router.push('/profiling')" class="inline-flex items-center mx-2 px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Profiling
                          </button>
                          <button type="button" @click="router.push('/relation')" class="inline-flex items-center mx-2 px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Relation
                          </button>
                          <button type="button" @click="() => {selectedJob = job; open = true; }" class="inline-flex items-center mx-2 px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            More Details
                          </button>
                        </div>                        
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>


        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <a
              href="#"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >Previous</a>
            <a
              href="#"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >Next</a>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing
                {{ ' ' }}
                <span class="font-medium">{{pageIndex*5-4}}</span>
                {{ ' ' }}
                to
                {{ ' ' }}
                <span
                  class="font-medium"
                >{{pageIndex*5}}</span>
                {{ ' ' }}
                of
                {{ ' ' }}
                <span
                  class="font-medium"
                >{{allJobs.length}}</span>
                {{ ' ' }}
                results
              </p>
            </div>
            <div>
              <nav
                class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <a
                  href="#"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span class="sr-only">Previous</span>
                  <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
                </a>
                <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
                <a v-for="n in Math.floor(allJobs.length/5)+1" :key="n"
                  href="#"
                  @click="pageIndex=n"
                  aria-current="page"
                  class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  :class="[pageIndex==n ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600': 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 ']"
                >{{n}}</a>
                <a
                  href="#"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span class="sr-only">Next</span>
                  <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <!-- /End replace -->
    </div>
  </div>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="fixed inset-0 overflow-hidden" @close="open = false">
      <div class="absolute inset-0 overflow-hidden">
        <DialogOverlay class="absolute inset-0" />

        <div class="fixed inset-y-20 right-0 pl-10 max-w-full flex">
          <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
            <div class="w-screen max-w-md">
              <div class="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl">
                <div class="min-h-0 flex-1 flex flex-col py-6 overflow-y-scroll">
                  <div class="px-4 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle class="text-lg font-medium text-gray-900">
                        {{selectedJob.name}}
                      </DialogTitle>
                      <div class="ml-3 h-7 flex items-center">
                        <button type="button" class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" @click="open = false">
                          <span class="sr-only">Close panel</span>
                          <XIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="mt-6 relative flex-1 px-4 sm:px-6">
                    <!-- Replace with your content -->
                    <div class="h-full border-2 border-dashed border-gray-200" aria-hidden="true" />
                    <!-- /End replace -->
                  </div>
                </div>
                <div class="flex-shrink-0 px-4 py-4 flex justify-end">
                  <button type="button" class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="open = false">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script>

import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Stats from '../components/Stats.vue'
import { ChevronLeftIcon, ChevronRightIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/vue/solid'
import { XIcon } from '@heroicons/vue/outline'
import { Dialog, DialogOverlay, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const allJobs = [
  {
    id: 1,
    name: 'OTIF_TEST',
    alertType: 'Mail, Compass',
    groupName: 'DA_OTIF',
    qualityCheck: 'Scheduled',
    email: 'ravi.kumar@kochtc.com',
    sourcePlatform: 'RS',
    destinationPlatform: '',
    fileCount: 100,
    sourceCount: 100,
    sourceTableName: 'ehanna_base_stg',
    stageCount: 81312,
    destinationTable: 'ehanna_base',
    targetCount: 7563,
    status: 'Completed',
    lastUpdated: '09/15/2021 1:15 PM'
  },
  {
    id: 2,
    name: 'OTIF_TEST',
    alertType: 'Mail, Compass',
    groupName: 'DA_OTIF',
    qualityCheck: 'Scheduled',
    email: 'ravi.kumar@kochtc.com',
    sourcePlatform: 'RS',
    destinationPlatform: '',
    fileCount: 100,
    sourceCount: 100,
    sourceTableName: 'ehanna_base_stg',
    stageCount: 81312,
    destinationTable: 'ehanna_base',
    targetCount: 7563,
    status: 'Completed',
    lastUpdated: '09/15/2021 4:08 PM'
  },
  {
    id: 3,
    name: 'OTIF_TEST',
    alertType: 'Mail, Compass',
    groupName: 'DA_OTIF',
    qualityCheck: 'Scheduled',
    email: 'ravi.kumar@kochtc.com',
    sourcePlatform: 'RS',
    destinationPlatform: '',
    fileCount: 100,
    sourceCount: 100,
    sourceTableName: 'ehanna_base_stg',
    stageCount: 81312,
    destinationTable: 'ehanna_base',
    targetCount: 0,
    status: 'DQ Completed',
    lastUpdated: '09/16/2021 8:51 AM'
  },
  {
    id: 4,
    name: 'Banner Pivot',
    alertType: 'Mail',
    groupName: 'Banner',
    qualityCheck: 'Scheduled',
    email: 'eda@gapac.com',
    sourcePlatform: 'AU',
    destinationPlatform: '',
    fileCount: '',
    sourceCount: '',
    sourceTableName: '',
    stageCount: '',
    destinationTable: 'pivot_run_details',
    targetCount: '',
    status: 'Pivot Job Completed',
    lastUpdated: '09/16/2021 8:51 AM'
  },
  {
    id: 5,
    name: 'Banner v6.5',
    alertType: 'Mail',
    groupName: 'Banner',
    qualityCheck: 'Scheduled',
    email: 'eda@gapac.com',
    sourcePlatform: 'RS',
    destinationPlatform: '',
    fileCount: '',
    sourceCount: '',
    sourceTableName: '',
    stageCount: '',
    destinationTable: 'banner_trend_exhaust',
    targetCount: '',
    status: 'Banner V6.5 Completed',
    lastUpdated: '09/17/2021 8:51 AM'
  },
  {
    id: 6,
    name: 'Banner v10',
    alertType: 'Mail',
    groupName: 'Banner',
    qualityCheck: 'Scheduled',
    email: 'eda@gapac.com',
    sourcePlatform: 'RS',
    destinationPlatform: '',
    fileCount: '1',
    sourceCount: '',
    sourceTableName: '',
    stageCount: '',
    destinationTable: 'banner_trend_outliers_ver10',
    targetCount: '',
    status: 'Banner v10 Completed',
    lastUpdated: '09/18/2021 8:51 AM'
  },
  {
    id: 7,
    name: 'Banner STADA',
    alertType: 'Mail',
    groupName: 'Banner',
    qualityCheck: 'Scheduled',
    email: 'eda@gapac.com',
    sourcePlatform: 'RS',
    destinationPlatform: '',
    fileCount: '',
    sourceCount: '',
    sourceTableName: '',
    stageCount: '',
    destinationTable: 'banner_stada_alerts_escalated',
    targetCount: '',
    status: 'Banner Stada Completed',
    lastUpdated: '09/19/2021 8:51 AM'
  },
  {
    id: 8,
    name: 'Banner MQT',
    alertType: 'Mail',
    groupName: 'Banner',
    qualityCheck: 'Scheduled',
    email: 'eda@gapac.com',
    sourcePlatform: 'Qasar',
    destinationPlatform: '',
    fileCount: '',
    sourceCount: '',
    sourceTableName: '',
    stageCount: '',
    destinationTable: 'banner metadata',
    targetCount: '1000',
    status: 'Completed',
    lastUpdated: '09/19/2021 8:51 AM'
  }
]

export default {
  components: {
    ArrowUpIcon,
    ArrowDownIcon,
    Stats,
    ChevronLeftIcon,
    ChevronRightIcon,
    Dialog,
    DialogOverlay,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    XIcon
  },
  setup() {
    const open = ref(false)
    const router = useRouter()
    const pageIndex = ref(1)
    const pageSize = ref(5)
    const currentSort = ref('lastUpdated')
    const currentSortDir = ref('asc')
    const selectedJob = ref({})

    return {
      open,
      allJobs,
      router,
      pageIndex,
      pageSize,
      currentSort,
      currentSortDir,
      selectedJob      
    }
  },
  computed: {
    sortedJob: function() {
      return this.allJobs.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === 'desc') modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return -1 * modifier;
        return 0;
      }).filter((row,index) => {
        let start = (this.pageIndex -1) * this.pageSize;
        let end = (this.pageIndex * this.pageSize);
        if (index >= start && index < end) return true;
      });
    }
  },
  methods: {
    nextPage: function () {
      if ((this.pageIndex*this.pageSize) < this.allJobs.length) this.pageIndex++;
    },
    prevPage: function() {
      if (this.pageIndex > 1) this.pageIndex--;
    }
  }
}
</script>