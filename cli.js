#! /usr/bin/env node

const { program } = require('commander')
const { execSync } = require('child_process')

/**
 * 查找数组中的匹配项，优先完全匹配，其次前缀匹配，再其次全文匹配
 * @param {String} target 匹配字符串
 * @param {String[]} list 匹配列表
 * @returns 匹配项
 */
function stringMatch(target, list) {
  if (list.includes(target)) {
    return target
  }

  const prefixMatches = list.filter((item) => item.startsWith(target))
  if (prefixMatches.length > 0) {
    prefixMatches.sort((a, b) => a.localeCompare(b, 'zh-CN'))
    return prefixMatches[0]
  }

  const fullMatches = list.filter((item) => item.includes(target))
  if (fullMatches.length > 0) {
    fullMatches.sort((a, b) => a.localeCompare(b, 'zh-CN'))
    return fullMatches[0]
  }

  return null
}


function getBranches() {
    return execSync('git branch --all --format="%(refname:short)"', { encoding: 'utf-8' })
      .trim()
      .split('\n')
      .map((branch) => branch.trim())
}

/**
 * 切换到指定的分支，优先完全匹配，其次匹配包含匹配字符串的分支
 * 如果是 - 的话，直接使用 -，不进行匹配
 * @param {String} str 匹配字符串
 */
const checkout = (str) => {
  const branches = getBranches()
  const branchName = str === '-' ? '-' : stringMatch(str, branches)
  if (branchName) {
    execSync(`git checkout ${branchName}`, { encoding: 'utf-8' })
  } else {
    process.exit(1)
  }
}

program
  .name('checkout')
  .alias('c')
  .arguments('<branch>')
  .description('quickly switch to another branch')
  .action(async (str) => {
    checkout(str)
  })

program.parse(process.argv)
