/**
 * Simple performance benchmark for routing operations
 * Run with: node benchmarks/route-matching.bench.js
 */

import { match } from 'path-to-regexp'

function benchmarkRouteMatching() {
    console.log('🔍 Benchmarking Route Matching Performance\n')

    const testCases = [
        { routes: 10, iterations: 10000 },
        { routes: 50, iterations: 5000 },
        { routes: 100, iterations: 2000 },
        { routes: 500, iterations: 1000 }
    ]

    testCases.forEach(({ routes: routeCount, iterations }) => {
        // Generate routes
        const routes = Array.from({ length: routeCount }, (_, i) => ({
            path: `/route-${i}/:id`,
            name: `Route ${i}`
        }))

        const testPath = `/route-${Math.floor(routeCount / 2)}/test-123`

        // Warm up
        for (let i = 0; i < 100; i++) {
            routes.find(({ path }) => {
                const matcher = match(path, { decode: decodeURIComponent })
                return matcher(testPath)
            })
        }

        // Benchmark
        const start = performance.now()

        for (let i = 0; i < iterations; i++) {
            routes.find(({ path }) => {
                const matcher = match(path, { decode: decodeURIComponent })
                return matcher(testPath)
            })
        }

        const end = performance.now()
        const totalTime = end - start
        const avgTime = totalTime / iterations
        const opsPerSec = Math.round(1000 / avgTime)

        console.log(`Routes: ${routeCount.toString().padEnd(5)} | ` +
            `Avg Time: ${avgTime.toFixed(3)}ms | ` +
            `Ops/sec: ~${opsPerSec.toLocaleString()}`)
    })

    console.log('\n✅ Route matching benchmark complete!\n')
}

function benchmarkDynamicParams() {
    console.log('🔗 Benchmarking Dynamic Parameter Extraction\n')

    const testCases = [
        { path: '/users/:id', test: '/users/123', params: 1 },
        { path: '/users/:userId/posts/:postId', test: '/users/john/posts/hello', params: 2 },
        { path: '/api/:version/:resource/:id', test: '/api/v1/users/123', params: 3 }
    ]

    const iterations = 50000

    testCases.forEach(({ path, test, params }) => {
        const matcher = match(path, { decode: decodeURIComponent })

        // Warm up
        for (let i = 0; i < 100; i++) {
            matcher(test)
        }

        // Benchmark
        const start = performance.now()

        for (let i = 0; i < iterations; i++) {
            matcher(test)
        }

        const end = performance.now()
        const totalTime = end - start
        const avgTime = totalTime / iterations
        const opsPerSec = Math.round(1000 / avgTime)

        console.log(`Params: ${params} | ` +
            `Avg Time: ${(avgTime * 1000).toFixed(2)}μs | ` +
            `Ops/sec: ~${opsPerSec.toLocaleString()}`)
    })

    console.log('\n✅ Dynamic parameter benchmark complete!\n')
}

// Run benchmarks
console.log('=' .repeat(60))
console.log('  Navigation Router Performance Benchmarks')
console.log('='.repeat(60))
console.log()

benchmarkRouteMatching()
benchmarkDynamicParams()

console.log('=' .repeat(60))
console.log('Note: Results may vary based on hardware and Node.js version')
console.log('=' .repeat(60))
