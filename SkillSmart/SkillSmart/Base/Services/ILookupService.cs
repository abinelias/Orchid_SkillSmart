﻿using SkillSmart.Base.Entities;
using System.Collections.Generic;
namespace SkillSmart.Base.Services
{
    
    public interface ILookupService<T> : IEntityService<T> where T : IEntity
    {
        IEnumerable<T> GetAll();
    }
}
