<template>
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="fixed inset-0 flex z-40 md:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>
        <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
          <div class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-indigo-700">
            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button type="button" class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="sidebarOpen = false">
                  <span class="sr-only">Close sidebar</span>
                  <XIcon class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="flex-shrink-0 flex items-center px-4">
              <!--<img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg" alt="Workflow" /> -->
              <h1>Banner</h1>
            </div>
            <div class="mt-5 flex-1 h-0 overflow-y-auto">
              <nav class="px-2 space-y-1">
                <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600', 'group flex items-center px-2 py-2 text-base font-medium rounded-md']">
                  <component :is="item.icon" class="mr-4 flex-shrink-0 h-6 w-6 text-indigo-300" aria-hidden="true" />
                  {{ item.name }}
                </a>
              </nav>
            </div>
          </div>
        </TransitionChild>
        <div class="flex-shrink-0 w-14" aria-hidden="true">
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden bg-indigo-700 md:flex md:flex-shrink-0">
      <div class="flex flex-col w-64">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div class="flex items-center flex-shrink-0 px-4">
            <!--<img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg" alt="Workflow" /> -->
            <svg _ngcontent-cjd-c21="" width="180" height="57" viewBox="0 0 261 57" id="logo" y="328.561"><g _ngcontent-cjd-c21="" transform="translate(0 .035)" fill="none" fill-rule="evenodd"><path _ngcontent-cjd-c21="" d="M130.435 55.728c71.857 0 130.11-12.387 130.11-27.67 0-15.283-58.253-27.672-130.11-27.672C58.578.386.325 12.776.325 28.058c0 15.283 58.253 27.67 130.11 27.67" fill="#231F1F"></path><path _ngcontent-cjd-c21="" d="M20.074 35.266c-.17 0-.302-.082-.302-.23v-3.174c0-.417.114-.583.34-.583h4.217v-7.896h-4.05c-.375 0-.47-.103-.47-.312V20.17c0-.418.152-.564.34-.564h26.203c3.125 0 6.758 1.628 6.758 3.925 0 2.048-2.54 3.342-3.726 3.99.753.312 3.878.772 3.878 3.76 0 3.422-4.67 3.986-5.27 3.986H20.073zm13.8-3.863h6.342c1.15 0 2.07-.796 2.07-1.444 0-.73-1.11-1.233-1.92-1.233h-6.493v2.676zm0-7.954v2.632h6.49c.546 0 1.874-.556 1.923-1.506.03-.605-1.13-1.127-1.902-1.127h-6.512zM72.51 35.267c-.28 0-.432-.188-.432-.398V31.82c0-.19.113-.314.302-.314h3.18l-1.527-2.206h-5.835l-1.528 2.206h2.688c.207 0 .3.125.3.25v3.11c0 .252-.074.4-.262.4H57.428c-.433 0-.753-.043-.753-.335v-3.195c0-.23.094-.354.376-.354h3.86l7.305-11.34c.187-.312.432-.437.658-.437h8.66c.376 0 .602.23.696.438l7.585 11.547h3.327c.32 0 .32.376.32.69v2.65c0 .252-.188.335-.527.335H72.51zm-3.524-9.22h4.6l-1.468-2.464c-.056-.062-1.495-.062-1.532 0l-1.6 2.465zM148.923 19.606c.187 0 .395.103.583.25l9.676 9.083V23.55h-3.306c-.284 0-.435-.104-.435-.27v-3.218c0-.25.134-.458.266-.458h11.773c.338 0 .414.313.414.522v3.048c0 .272-.188.376-.433.376h-3.176v11.15c0 .356-.093.564-.338.564H152.35c-.134 0-.34-.02-.47-.146l-10.598-9.96v6.16h3.515c.224 0 .47.104.47.313v3.174c0 .313-.15.46-.376.46h-12.056c-.19 0-.283-.147-.283-.42v-3.152c0-.167.095-.376.472-.376h3.25V23.55h-3.383c-.13 0-.32-.063-.32-.376V19.92c0-.21.19-.314.47-.314h15.883M109.77 19.606c.19 0 .396.103.584.25l9.677 9.083V23.55h-3.307c-.283 0-.434-.104-.434-.27v-3.218c0-.25.132-.458.262-.458h11.776c.337 0 .413.313.413.522v3.048c0 .272-.187.376-.43.376h-3.18v11.15c0 .356-.092.564-.337.564h-11.597c-.13 0-.338-.02-.47-.146l-10.597-9.96v6.16h3.514c.226 0 .47.104.47.313v3.174c0 .313-.15.46-.376.46H93.68c-.188 0-.282-.147-.282-.42v-3.152c0-.167.094-.376.47-.376h3.252V23.55h-3.383c-.13 0-.32-.063-.32-.376V19.92c0-.21.19-.314.47-.314h15.884M203.635 19.606c.34 0 .434.146.434.458v5.49c0 .21-.058.355-.245.355h-6.892c-.134 0-.245 0-.245-.147v-2.17h-10.882v2.446h6.062c.188 0 .264.042.264.208v2.765c0 .167-.226.21-.45.21h-5.876v2.16h11.033v-1.676c0-.187.056-.417.357-.417h6.89c.13 0 .206.104.206.397v5.287c0 .146-.076.292-.434.292h-31.927c-.244 0-.47.02-.47-.23v-3.298c0-.19.115-.355.283-.355h4.27v-7.81h-4.29c-.148 0-.263.043-.263-.21v-3.57c0-.104.187-.187.47-.187h31.702M232.052 19.606c.49 0 4.558.146 6.196.877 1.167.522 2.88 1.587 2.88 3.278 0 1.567-1.92 2.736-3.764 3.53 1.485.793 2.426 1.252 2.99 3.404.133.396.303.668.604.668.396 0 1.45.034 1.45-1.343v-.587c0-.125.075-.21.264-.21h2.22c.133 0 .21.085.21.335v1.845c0 2.234-2.96 3.863-4.333 3.863h-7.474c-1.224 0-2.37-1.17-2.655-1.754-.28-.52-.695-2.15-.884-2.653-.6-1.628-2.484-1.712-2.917-1.712h-4.744v2.277h4.385c.172 0 .286.02.286.124v3.592c0 .103-.114.124-.285.124h-18.2c-.095 0-.21-.082-.21-.292V31.55c0-.105.097-.25.21-.25h4.16v-7.935h-4.18c-.17 0-.283-.043-.283-.314V19.9c0-.146.075-.292.208-.292h23.867zm-9.956 3.843v2.746h5.74c1.226 0 2.712-.702 2.712-1.517 0-.982-1.94-1.23-2.26-1.23h-6.192z" fill="#FFF"></path></g></svg>
          </div>
          <div class="mt-5 flex-1 flex flex-col">
            <nav class="flex-1 px-2 space-y-1">
              <a v-for="item in navigation" :key="item.name" href="javascript:void(0)" @click="() => {currentRoute=item.id; router.push(item.href) }" :class="[currentRoute == item.id ? 'bg-indigo-800 text-white' : 'text-indigo-100 hover:bg-indigo-600', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']">
                <component :is="item.icon" class="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300" aria-hidden="true" />
                {{ item.name }}
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  Dialog,
  DialogOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  BellIcon,
  MenuAlt2Icon,
  XIcon,
  LinkIcon,
  ChatAlt2Icon,
  DocumentReportIcon,
  TableIcon
} from '@heroicons/vue/outline'
import { SearchIcon } from '@heroicons/vue/solid'

const navigation = [
  { id: 1, name: 'Jobs', href: '/', icon: TableIcon, current: true },
  { id: 2, name: 'Data Profiling', href: '/profiling', icon: DocumentReportIcon, current: false },
  { id: 3, name: 'Job Relation', href: '/relation', icon: LinkIcon, current: false },
  { id: 4, name: 'Chatbot', href: '/chatbot', icon: ChatAlt2Icon, current: false }
]

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

export default {
  components: {
    Dialog,
    DialogOverlay,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
    BellIcon,
    MenuAlt2Icon,
    SearchIcon,
    XIcon,
  },
  setup() {
    const sidebarOpen = ref(false)
    const router = useRouter()
    const currentRoute = ref(1)

    return {
      navigation,
      userNavigation,
      sidebarOpen,
      currentRoute,
      router
    }
  }
}
</script>