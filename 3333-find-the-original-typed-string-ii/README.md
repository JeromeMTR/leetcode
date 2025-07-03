<p>Alice is attempting to type a specific string on her computer. However, she tends to be clumsy and <strong>may</strong> press a key for too long, resulting in a character being typed <strong>multiple</strong> times.</p>

<p>This time, Alice is aware that she may have made this mistake <strong>any number of times</strong> (possibly zero), and <strong>possibly for multiple different characters</strong>.</p>

<p>You are given a string <code>word</code>, which represents the <strong>final</strong> output displayed on Alice's screen.</p>

<p>Return the total number of <em>possible</em> original strings that Alice <em>might</em> have intended to type.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">word = "abbcccc"</span></p>
<p><strong>Output:</strong> <span class="example-io">8</span></p>
<p><strong>Explanation:</strong></p>
<p>The possible original strings are: <code>"abbcccc"</code>, <code>"abbccc"</code>, <code>"abbcc"</code>, <code>"abbc"</code>, <code>"abcccc"</code>, <code>"abccc"</code>, <code>"abcc"</code>, <code>"abc"</code>.</p>
</div>

<p><strong class="example">Example 2:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">word = "abcd"</span></p>
<p><strong>Output:</strong> <span class="example-io">1</span></p>
<p><strong>Explanation:</strong></p>
<p>The only possible original string is <code>"abcd"</code>.</p>
</div>

<p><strong class="example">Example 3:</strong></p>

<div class="example-block">
<p><strong>Input:</strong> <span class="example-io">word = "aaaa"</span></p>
<p><strong>Output:</strong> <span class="example-io">4</span></p>
<p><strong>Explanation:</strong></p>
<p>The possible original strings are: <code>"a"</code>, <code>"aa"</code>, <code>"aaa"</code>, <code>"aaaa"</code>.</p>
</div>

<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>
<ul>
    <li><code>1 &lt;= word.length &lt;= 100</code></li>
    <li><code>word</code> consists only of lowercase English letters.</li>
</ul>