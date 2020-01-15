---
title: Lucene.Net备忘
date: 2020-01-14
tags:

  - LuceneNet
  - NLP

---

## Lucene的相关度积分公式

`score_d = sum_t(tf_q * idf_t / norm_q * tf_d * idf_t / norm_d_t * boost_t) * coord_q_d`

注解：

score_d : 该文档d的得分 

sum_t : 所有项得分的总和

tf_q : 查询串q中，某个项出项的次数的平方根

tf_d : 文档d中 ，出现某个项的次数的平方根

numDocs : 在这个索引里，找到分数大于0的文档的总数

docFreq_t : 包含项t的文档总数

idf_t : log(numDocs/docFreq+1)+1.0 norm_q : sqrt(sum_t((tf_q*idf_t)^2)) 
norm_d_t : 在文档d中，与项t相同的域中，所有的项总数的平方根

boost_t : 项t的提升因子，一般为 1.0

coord_q_d : 在文档d中，命中的项数量除以查询q的项总数

> 来自 <http://blog.csdn.net/my_et/article/details/8879330> 

## 待续