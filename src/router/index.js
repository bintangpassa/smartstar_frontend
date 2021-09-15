//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes
const routes = [
    {
        path: '/',
        name: 'landingpage',
        component: () => import( /* webpackChunkName: "post.index" */ '@/views/landingpage/index.vue'),
        meta: {
            title: 'SmartStarss',
            metaTags: [
                {
                    property: 'site_name',
                    content: 'SmartStar Dummy'
                },
                {
                    property: 'title',
                    content: 'SmartStar Dummy'
                },
                {
                    property: 'image',
                    itemprop: 'image',
                    content: 'https://smartstar.bintangpassa.com/img/smartstar.e4283eb6.png'
                },
                {
                    property: 'type',
                    content: 'website'
                },
                {
                    property: 'image:type',
                    content: 'image/png'
                },
                {
                    property: 'description',
                    content: 'Education made easy when you can prepare, generate and share worksheets with just a few clicks.'
                },
                {
                    property: 'url',
                    content: 'https://smartstar.bintangpassa.com'
                }
            ]
          }
    },
    {
        path: '/console',
        name: 'console',
        component: () => import( /* webpackChunkName: "post.create" */ '@/views/console/index.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import( /* webpackChunkName: "post.create" */ '@/views/login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import( /* webpackChunkName: "post.create" */ '@/views/register.vue')
    }
]

//create router
const router = createRouter({
    history: createWebHistory(),
    routes  // config routes
})

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
    // This goes through the matched routes from last to first, finding the closest route with a title.
    // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
    // `/nested`'s will be chosen.
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  
    // Find the nearest route element with meta tags.
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  
    const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  
    // If a route with a title was found, set the document (page) title to that value.
    if(nearestWithTitle) {
      document.title = nearestWithTitle.meta.title;
    } else if(previousNearestWithMeta) {
      document.title = previousNearestWithMeta.meta.title;
    }
  
    // Remove any stale meta tags from the document using the key attribute we set below.
    Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));
  
    // Skip rendering meta tags if there are none.
    if(!nearestWithMeta) return next();
  
    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags.map(tagDef => {
      const tag = document.createElement('meta');
  
      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });
  
      // We use this to track which meta tags we create so we don't interfere with other ones.
      tag.setAttribute('data-vue-router-controlled', '');
  
      return tag;
    })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag));
  
    next();
  });

export default router